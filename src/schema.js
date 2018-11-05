import {Ok, Error, collectError, mapOk, mapError} from './result'
import {Just, Nothing} from './maybe'
import {match, union, isMember} from './adt'
import R from 'ramda'
import is from 'is_js'

const Validator = union({
  Obj: (s) => s,
  Value: (p) => p,
  List: (l) => l,
  Tuple: (t) => t,
  Maybe: (m) => m
})
export const Obj = (val) => Validator.Obj(val)
export const Value = (val) => Validator.Value(val)
export const List = (val) => Validator.List(val)
export const Tuple = (val) => Validator.Tuple(val)
export const Maybe = (val) => Validator.Maybe(val)

// a -> Result
export const isString = Value((data, path) => {
  const bool = is.string(data)
  return bool ? Ok(data) : Error({expected: 'string', received: data, path})
})

export const isNumber = Value((data, path) => {
  const bool = is.number(data);
  return bool ? Ok(data) : Error({expected: 'number', received: data, path})
})

// (a -> Result) -> a -> Result
export const validate = (validator, path = []) => (data) => {
  return R.pipe(
    match({
      Obj: (schema) => mapValidator(schema, path)(data),
      Value: (v) => v(data, path),
      List: (l) => listValidator(l, path)(data),
      Tuple: (t) => tupleValidator(t, path)(data),
      Maybe: (m) => maybeValidator(m, path)(data)
    }),
  )(validator)
 }

// Object -> Schema -> Result
export const mapValidator = (schema, path) => (data) => {
  if (!data) {
    return Error({expected: 'object', received: data, path})
  }
  const keys = Object.keys(schema);
  const results = keys.map(key => {
    return {key, result: validate(schema[key], R.concat(path, [key]))(data[key])}
  })
  const returnData = R.reduce((acc, r) => {
    return match({
      Ok: (val) => R.assoc(r.key, val, acc),
      Error: (err) => acc
    })(r.result)
  }, {})(results)
  return R.pipe(
    R.map(r => r.result),
    collectError,
    mapOk(() => returnData)
  )(results)
}

export const listValidator = (schema, path) => (data) => {
  const results = data.map((item, i) => validate(schema, R.concat(path, [i]))(item))
  return R.pipe(
    collectError,
    mapOk(() => data)
  )(results)
}

export const tupleValidator = (schema, path) => (data) => {
  const results = schema.map((s, i) => {
    return validate(s, R.concat(path, [i]))(data[i])
  })
  return R.pipe(
    collectError,
    mapOk(() => data)
  )(results)
}

export const maybeValidator = (validator, path) => (data) => {
  const notExisty = is.not.existy(data);
  const validates = validate(validator)(data);
  return match({
    Ok: () => Ok(Just(data)),
    Error: (error) => notExisty ? Ok(Nothing()) : Error(error)
  })(validates)
}

