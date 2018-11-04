import {Ok, Error, collectError, mapOk} from './result'
import {match, union} from './adt'
import R from 'ramda'

const Validator = union({
  Obj: (s) => s,
  Value: (p) => p,
  List: (l) => l,
  Tuple: (t) => t
})
export const Obj = (val) => Validator.Obj(val)
export const Value = (val) => Validator.Value(val)

// a -> Result
export const isString = Value((data) => {
  const bool = toString.call(data) === '[object String]'
  return bool ? Ok(data) : Error(`Expected String, got \`${data}\``)
})

// (a -> Result) -> a -> Result
export const validate = (validator) => (data) => {
  return R.pipe(
    match({
      Obj: (schema) => mapValidator(schema)(data),
      Value: (v) => v(data),
      List: (l) => l,
      Tuple: (t) => t
    }),
    mapOk(() => data)
  )(validator)
 }

// Object -> Schema -> Result
export const mapValidator = (schema) => (data) => {
  const keys = Object.keys(schema);
  const results = keys.map(key => {
    return validate(schema[key])(data[key])
  })
  return collectError(results)
}
