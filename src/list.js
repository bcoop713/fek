import R from 'ramda';
import {Just, Nothing} from './maybe'
import {match} from './adt'

export const remove = item => list => {
  const [first, [head, ...rest]] = R.splitWhen(R.equals(item), list)
  return [...first, ...rest]
}

export const removeAt = index => list => {
  return (index >= 0 && list.length > index)
        || (index < 0 && list.length + 1 > index * -1)
        ? R.remove(index, 1, list)
        : list
}

export const head = list => list.length > 0 ? Just(list[0]) : Nothing()

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

export const last = list => list.length > 0 ? Just(R.last(list)) : Nothing()

export const popAt = index => list => {
  const popped = (index >= 0 && list.length > index)
        || (index < 0 && list.length + 1 > index * -1)
        ? Just(R.nth(index, list))
        : Nothing()
  const rest = match({
    Just: () => R.remove(index, 1, list),
    Nothing: () => list
  })(popped)
  return [popped, rest]
}

export const replaceAt = index => value => list =>
  R.adjust(index, () => value, list)

