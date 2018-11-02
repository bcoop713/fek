import {Ok, Error, fromResult, toResult} from '../src/result';

test('Ok', () => {
  const okStructure = Ok(1);
  const expectedStructure = {
    value: 1,
    keys: ['Ok', 'Error'],
    type: 'Ok'
  }
  expect(okStructure).toEqual(expectedStructure)
})

test('Error', () => {
  const errorStructure = Error("ERROR");
  const expectedStructure = {
    value: "ERROR",
    keys: ['Ok', 'Error'],
    type: 'Error'
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
