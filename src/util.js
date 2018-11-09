import {Just, Nothing, fromMaybe} from './maybe'
import {match} from './adt'

export const cond = condition => val => {
  const [first, ...rest] = condition;
  const [test, fn] = first;
  if (test === true) {
    return fn(val);
  } else if (test === false) {
    return cond(rest)(val);
  } else if (test(val)) {
    return fn(val);
  }
  return cond(rest)(val);
};

export const map = (fn) => (data) => {
  return data.map(fn)
}

export const filter = (fn) => (data) => {
  return data.filter(fn)
}

export const reduce = (fn) => (init) => (data) => {
  return data.reduce(fn, init)
}

export const head = (data) => {
  return data.length > 0 ? Just(data[0]) : Nothing()
}

export const tail = (data) => {
  return data.length > 0
    ? Just(data.slice(1)) : Nothing()
}

export const find = (fn) => (data) => {
  const h = head(data)
  const t = fromMaybe([])(tail(data))
  return match({
    Just: (val) => fn(val) === true ? Just(val) : find(fn)(t),
    Nothing: () => Nothing()
  })(h)
}
