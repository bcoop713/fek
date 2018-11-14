import * as F from '../src/obj'
import * as R from '../src/result'

test('clone', () => {
  const obj = {a: '1'}
  const expected = {a: '1'}

  const result = F.clone(obj)

  expect(result).toEqual(expected)
  expect(result).not.toBe(expected)
})

describe('removeKey', () => {
  test('should delete key if exists', () => {
    const obj = {a: '1', b: '2'}
    const expected = {b: '2'}

    const result = F.removeKey('a')(obj)
    expect(result).toEqual(expected)
  })
  test('should ignore if key doesnt exist', () => {
    const obj = {a: '1', b: '2'}
    const expected = {a: '1', b: '2'}

    const result = F.removeKey('c')(obj)
    expect(result).toEqual(expected)
    expect(result).not.toBe(obj)
  })
})

describe('removeKeys', () => {
  test('should delete keys if exists', () => {
    const obj = {a: '1', b: '2', c: '3'}
    const expected = {c: '3'}

    const result = F.removeKeys(['a', 'b'])(obj)
    expect(result).toEqual(expected)
  })
  test('should ignore if key doesnt exist', () => {
    const obj = {a: '1', b: '2'}
    const expected = {b: '2'}

    const result = F.removeKeys(['a', 'c'])(obj)
    expect(result).toEqual(expected)
    expect(result).not.toBe(obj)
  })
})

describe('get$', () => {
  test('should return value at key if exists', () => {
    const obj = {a: '1', b: '2'}

    const result = F.get$('a')(obj)
    expect(result).toBe('1')
  })
  test('should throw if key doesnt exist', () => {
    const obj = {a: '1', b: '2'}

    expect(() => F.get$('c')(obj)).toThrow()
  })
})

describe('get', () => {
  test('should return ok value at key if exists', () => {
    const obj = {a: '1', b: '2'}

    const result = F.get('a')(obj)
    expect(result).toEqual(R.Ok('1'))
  })
  test('should return error if key doesnt exist', () => {
    const obj = {a: '1', b: '2'}
    const result = F.get('c')(obj)

    expect(result).toEqual(R.Error())
  })
})

describe('getWithDefault', () => {
  test('should return value at key if exists', () => {
    const obj = {a: '1', b: '2'}

    const result = F.getWithDefault('a')('0')(obj)
    expect(result).toEqual('1')
  })
 test('should return default if key doesnt exist', () => {
    const obj = {a: '1', b: '2'}
   const result = F.getWithDefault('c')('0')(obj)

   expect(result).toEqual('0')
  })
})

test('merge', () => {
  const obj1 = {a: 1}
  const obj2 = {b: 2}
  const result = F.merge(obj2)(obj1)
  expect(result).toEqual({a: 1, b: 2})
})

test('mergeWith', () => {
  const obj1 = {a: 1, b: 1}
  const obj2 = {b: 2}
  const sub = (v2) => (v1) => v1 - v2
  const result = F.mergeWith(sub)(obj2)(obj1)
  expect(result).toEqual({a: 1, b: -1})
})

test('put', () => {
  const obj = {a: 1}
  const result = F.put('b')(2)(obj)
  expect(result).toEqual({a: 1, b: 2})
})

test('take', () => {
  const obj = {a: 1, b: 2, c: 3}
  const keys = ['a', 'b', 'e']
  const result = F.take(keys)(obj)
  expect(result).toEqual({a: 1, b: 2})
})

describe('update$', () => {
  test('should call the fn with key and return new obj', () => {
    const obj = {counter: 0};
    const updateFn = jest.fn((val) => val + 1)
    const result = F.update$('counter')(updateFn)(obj)
    expect({counter: 1}).toEqual(result)
  })
  test('should throw if key doesnt exist', () => {
    const obj = {counter: 0};
    const updateFn = jest.fn((val) => val + 1)
    expect(() => F.update$('a')(updateFn)(obj)).toThrow()
  })
})
