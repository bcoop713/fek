import {isString, validate, mapValidator, Obj} from '../src/schema'
import {Ok, Error} from '../src/result'

describe('string validation integration', () => {
  test('ok', () => {
    const data = "test";
    const validator = isString
    const result = validate(validator)(data)
    const expected = Ok("test")
    expect(result).toEqual(expected)
  })
  test('error', () => {
    const data = 3;
    const validator = isString
    const result = validate(validator)(data)
    const expected = Error("Expected String, got `3`")
    expect(result).toEqual(expected)
  })
})

describe('object', () => {
  test('ok', () => {
    const data = {
      key1: 'string1',
      key2: 'string2',
      key3: {key4: 'string4'}
    }
    const validator = Obj({
      key1: isString,
      key2: isString,
      key3: Obj({
        key4: isString
      })
    })
    const result = validate(validator)(data)
    const expected = Ok(data)
    expect(result).toEqual(expected)
  })
  test('error', () => {
    const data = {
      key1: 'string1',
      key2: 3,
      key3: {key4: 2}
    }
    const validator = Obj({
      key1: isString,
      key2: isString,
      key3: Obj({
        key4: isString
      })
    })
    const result = validate(validator)(data)
    const expected = Error(['Expected String, got `3`', 'Expected String, got `2`'])
    expect(result).toEqual(expected)
  })
})
