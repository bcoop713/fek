import {Ok, Error, fromResult, toResult, collectError, mapOk, mapError} from '../src/result';
import C from '../src/constants';

test('Ok', () => {
  const okStructure = Ok(1);
  const expectedStructure = {
    [C.value]: 1,
    [C.keys]: ['Ok', 'Error'],
    [C.type]: 'Ok'
  }
  expect(okStructure).toEqual(expectedStructure)
})

test('Error', () => {
  const errorStructure = Error("ERROR");
  const expectedStructure = {
    [C.value]: "ERROR",
    [C.keys]: ['Ok', 'Error'],
    [C.type]: 'Error'
  }
  expect(errorStructure).toEqual(expectedStructure)
})

describe('toResult', () => {
  test('has value', () => {
    const result = toResult(1)("Failed");
    const expected = Ok(1);
    expect(result).toEqual(expected);
  })
  test('is null', () => {
    const result = toResult(null)("Failed");
    const expected = Error("Failed");
    expect(result).toEqual(expected);
  })
  test('is undefined', () => {
    const result = toResult(undefined)("Failed");
    const expected = Error("Failed");
    expect(result).toEqual(expected);
  })
})

describe('fromResult', () => {
  test('from Ok', () => {
    const r = Ok(3)
    const result = fromResult(r)(0)
    expect(result).toBe(3)
  })
  test('from Error', () => {
    const r = Error()
    const result = fromResult(r)(0)
    expect(result).toBe(0)
  })
})

describe('collectError', () => {
  test('all Ok', () => {
    const results = [1, 2, 3, 4].map(val => Ok(val))
    const result = collectError(results)
    expect(result).toEqual(Ok(4))
  })
  test('all Error', () => {
    const results = [[1], [2], [3]].map(val => Error(val))
    const result = collectError(results)
    expect(result).toEqual(Error([1, 2, 3]))
  })
})

describe('mapOk', () => {
  test('ok', () => {
    const ok = Ok(1)
    const result = mapOk((r) => r + 1)(ok)

    const expected = Ok(2)
    expect(result).toEqual(expected)
  })
  test('error', () => {
    const error = Error("Error")
    const result = mapOk((r) => r + 1)(error)

    expect(result).toEqual(error)
  })
})

describe('mapError', () => {
  test('ok', () => {
    const ok = Ok(1)
    const result = mapError((r) => r + 1)(ok)

    const expected = Ok(1)
    expect(result).toEqual(expected)
  })
  test('error', () => {
    const error = Error(1)
    const result = mapError((r) => r + 1)(error)

    expect(result).toEqual(Error(2))
  })
})
