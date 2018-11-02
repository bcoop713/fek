import {Just, Nothing, toMaybe, fromMaybe} from '../src/maybe'

test('Just', () => {
  const justStructure = Just(1);
  const expectedStructure = {
    value: 1,
    keys: ['Just', 'Nothing'],
    type: 'Just'
  }
  expect(justStructure).toEqual(expectedStructure)
})

test('Nothing', () => {
  const justStructure = Nothing();
  const expectedStructure = {
    value: null,
    keys: ['Just', 'Nothing'],
    type: 'Nothing'
  }
  expect(justStructure).toEqual(expectedStructure)
})

describe('toMaybe', () => {
  test('has value', () => {
    const result = toMaybe(1);
    const expected = Just(1);
    expect(result).toEqual(expected);
  })
  test('is null', () => {
    const result = toMaybe(null);
    const expected = Nothing();
    expect(result).toEqual(expected);
  })
  test('is undefined', () => {
    const result = toMaybe(undefined);
    const expected = Nothing();
    expect(result).toEqual(expected);
  })
})

describe('fromMaybe', () => {
  test('from Just', () => {
    const maybe = Just(3)
    const result = fromMaybe(maybe)(0)
    expect(result).toBe(3)
  })
  test('from Nothing', () => {
    const maybe = Nothing()
    const result = fromMaybe(maybe)(0)
    expect(result).toBe(0)
  })
})

