import {union, match} from './adt';

const Result = union({
  Ok: (val) => val,
  Error: (val) => val
})

export const Ok = (val) => Result.Ok(val)
export const Error = (val) => Result.Error(val)

export const toResult = (val) => (error) =>
  val === null || val === undefined
  ? Result.Error(error)
  : Result.Ok(val)

export const fromResult = (val) => (fallback) => {
  return match({
    Ok: (val) => val,
    Error: (_) => fallback
  })(val)
}
