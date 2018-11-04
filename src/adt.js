import C from './constants';
import R from 'ramda';

export const match = (pattern) => (instance) => {
  const missingKeys = R.difference(instance[C.keys], R.keys(pattern))
  if (missingKeys.length !== 0) {
    console.warn(`Missing Matches: ${missingKeys}`)
  }
  return pattern[instance[C.type]](instance[C.value])
}

export const union = (constructor) => {
  const keys = Object.keys(constructor)
  return Object.assign({}, ...keys.map(k => {
    return {[k]: (val) => ({
      [C.value]: constructor[k](val),
      [C.keys]: keys,
      [C.type]: k}
    )}
  }))
}

export const isMember = (type) => (instance) => instance && instance[C.type] === type
