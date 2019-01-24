import R from 'ramda';
import {Just, Nothing} from './maybe'

export const remove = item => list => {
  const [first, [head, ...rest]] = R.splitWhen(R.equals(item), list)
  return [...first, ...rest]
}

export const removeAt = index => list => {
  return R.remove(index, 1, list)
}

export const first = list => list.length > 0 ? Just(list[0]) : Nothing()

export const flatten = list => R.flatten(list)

export const reduce = func => acc => list => list.reduce(func, acc)

export const insertAt = index => value => list => {
  const cappedIndex = index >= 0
    ? R.min(list.length, index)
    : R.max(list.length * -1 - 1, index)
  return cappedIndex >= 0
    ? R.insert(cappedIndex, value, list)
    : R.reverse(R.insert((cappedIndex * -1 - 1), value, R.reverse(list)))

}

