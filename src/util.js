export const cond = (condition) => (val) => {
  const [first, ...rest] = condition
  const [test, fn] = first
  if (test === true ) {
    return fn(val)
  } else if (test === false) {
    return cond(rest)(val)
  } else if (test(val)) {
    return fn(val)
  }
  return cond(rest)(val)
}
