import {isString, validate} from '../src/schema'
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

xdescribe('object', () => {
  test('ok', () => {
    const data = {
      key1: 'string1',
      key2: 'string2'
    }
    const validator = mapValidator({
      key1: isString,
      key2: isString
    })
    const result = validate(validator)(data)
    const expected = Ok(data)
    expect(result).toEqual(expected)
  })
})
