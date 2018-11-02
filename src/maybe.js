import {union, match} from './adt'

const Maybe = union({
  Just: (val) => val,
  Nothing: () => null
})

export const Just = (val) => Maybe.Just(val)
export const Nothing = () => Maybe.Nothing()

export const toMaybe = (val) =>
  val === null || val === undefined
  ? Maybe.Nothing()
  : Maybe.Just(val)

export const fromMaybe = (val) => (fallback) => {
  return match({
    Just: (val) => val,
    Nothing: () => fallback
  })(val)
}

