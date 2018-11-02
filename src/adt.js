export const match = (pattern) => (instance) => {
  return pattern[instance.type](instance.value)
}

export const union = (constructor) => {
  const keys = Object.keys(constructor)
  return Object.assign({}, ...keys.map(k => {
    return {[k]: (val) => ({
      value: constructor[k](val),
      keys: keys,
      type: k}
    )}
  }))
}

