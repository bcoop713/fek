import * as U from '../src/util';
import {Just, Nothing} from '../src/maybe';

describe('cond', () => {
  test('should execute the matched function', () => {
    const value = 3;
    const result = U.cond([
      [n => n < 2, () => 2],
      [n => n >= 2, n => n + 1],
      [true, n => n]
    ])(3);
    expect(result).toBe(4);
  });
});

test('map', () => {
  const data = [1, 2, 3];
  const result = U.map((d) => d + 1)(data)
  expect(result).toEqual([2, 3, 4])
})

test('filter', () => {
  const data = [1, 2, 3];
  const result = U.filter((d) => d === 2)(data)
  expect(result).toEqual([2])
})

test('reduce', () => {
  const data = [1, 2, 3];
  const result = U.reduce((acc, v) => acc + v)(0)(data)
  expect(result).toEqual(6)
})

describe('head', () => {
  test('0 elem array', () => {
    const data = [];
    const result = U.head(data)
    expect(result).toEqual(Nothing())
  })
  test('1 elem array', () => {
    const data = [1];
    const result = U.head(data)
    expect(result).toEqual(Just(1))
  })
})

describe('tail', () => {
  test('0 elem array', () => {
    const data = [];
    const result = U.tail(data)
    expect(result).toEqual(Nothing())
  })
  test('1 elem array', () => {
    const data = [1];
    const result = U.tail(data)
    expect(result).toEqual(Just([]))
  })
  test('2 elem array', () => {
    const data = [1, 2];
    const result = U.tail(data)
    expect(result).toEqual(Just([2]))
  })
})

describe('find', () => {
  test('found', () => {
    const data = [1, 2, 3];
    const result = U.find(d => d === 3)(data)
    expect(result).toEqual(Just(3))
  })
  test('not found', () => {
    const data = [1, 2, 3];
    const result = U.find(d => d === 4)(data)
    expect(result).toEqual(Nothing())
  })
})
