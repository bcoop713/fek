import * as R from './result'
export const clone = (obj) => {
  return Object.assign({}, obj)
}

export const removeKey = (key) => (obj) => {
  const objClone = Object.assign({}, obj)
  delete objClone[key]
  return objClone
}

export const removeKeys = (keys) => (obj) => {
  const objClone = Object.assign({}, obj)
  keys.forEach((key) => {
    delete objClone[key]
  })
  return objClone
}

export const get$ = (key) => (obj) => {
  if (obj[key]) {
    return obj[key]
  } else {
    throw new Error(`Key: ${key} does not exist on ${JSON.stringify(obj)}`)
  }
}

export const get = (key) => (obj) => {
  return obj[key] && R.Ok(obj[key]) || R.Error()
}

export const getWithDefault = (key) => (fallback) => (obj) => {
  return obj[key] || fallback
}

export const merge = (obj2) => (obj1) => {
  return Object.assign({}, obj1, obj2)
}

export const mergeWith = (fn) => (obj2) => (obj1) => {
  let mergedObj = {}
  Object.keys(obj1).forEach(key => {
    if (obj2[key]) {
      mergedObj[key] = fn(obj2[key])(obj1[key])
    }
  })
  return Object.assign({}, obj1, obj2, mergedObj)
}

export const put = (key) => (value) => (obj) => {
  return Object.assign(obj, {[key]: value})
}

export const take = (keys) => (obj) => {
  let newObj = {}
  keys.forEach(key => {
    const val = obj[key]
    if (val) {
      newObj[key] = val
    }
  })
  return newObj
}

export const update$ = (key) => (fn) => (obj) => {
  if (obj[key] !== undefined) {
    return Object.assign({}, obj, {[key]: fn(obj[key])})
  } else {
    throw new Error(`Key: ${key} does not exist on ${JSON.stringify(obj)}`)
  }
}
