import {Ok, Error} from './result'

export const isString = (data) => {
  return {
    test: toString.call(data) === '[object String]',
    error: `Expected String, got \`${data}\``
  }
}

export const validate = (validator) => (data) => {
  const v = validator(data)
  return v.test ? Ok(data) : Error(v.error)
}

export const mapValidator = (schema) => {
  
}
