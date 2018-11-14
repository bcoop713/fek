import { union, match, isMember } from './adt';
import C from './constants';
import { cond } from './util';
import * as R from 'ramda';

const Result = union({
  Ok: val => val,
  Error: val => val
});

export const Ok = val => Result.Ok(val);
export const Error = val => Result.Error(val);

export const toResult = val => error =>
  val === null || val === undefined ? Result.Error(error) : Result.Ok(val);

export const fromResult = val => fallback => {
  return match({
    Ok: val => val,
    Error: _ => fallback
  })(val);
};

export const collectError = results => {
  if (R.all(isMember('Ok'))(results)) {
    return R.last(results);
  } else {
    return R.pipe(
      R.filter(isMember('Error')),
      R.reduce((acc, result) => acc.concat(result[C.value]), []),
      Error
    )(results);
  }
};

export const mapOk = fn => result => {
  return match({
    Ok: val => Ok(fn(val)),
    Error: error => Error(error)
  })(result);
};

export const mapError = fn => result => {
  return match({
    Ok: val => Ok(val),
    Error: error => Error(fn(error))
  })(result);
};
