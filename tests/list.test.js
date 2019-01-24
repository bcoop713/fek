import * as L from '../src/list'
import R from 'ramda'
import {Just, Nothing} from '../src/maybe'

test('remove', () => {
  const data = [1,2,3];
  const result = L.remove(2)(data)
  expect(result).toEqual([1, 3])
})

describe('removeAt', () => {
  test('index exists', () => {
    const data = [1, 2, 3];
    const result = L.removeAt(1)(data)
    expect(result).toEqual([1, 3])
  })
  test('index is negative', () => {
    const data = [1, 2, 3];
    const result = L.removeAt(-1)(data)
    expect(result).toEqual([1, 2])
  })
  test('index out of range', () => {
    const data = [1, 2, 3];
    const result = L.removeAt(3)(data)
    expect(result).toEqual([1, 2, 3])
  })
})

describe('first', () => {
  test('has first', () => {
    const data = [1, 2, 3];
    const result = L.first(data)
    expect(result).toEqual(Just(1))
  })
  test('empty list', () => {
    const data = [];
    const result = L.first(data)
    expect(result).toEqual(Nothing())
  })
})

test('flatten', () => {
  const data = [[1], [2, [3]]];
  const result = L.flatten(data)
  expect(result).toEqual([1, 2, 3])
})

test('reduce', () => {
  const data = [1, 2, 3];
  const result = L.reduce(R.add)(0)(data)
  expect(result).toEqual(6)
})

describe('insertAt', () => {
  test('index exists', () => {
    const data = [1, 2, 3];
    const result = L.insertAt(1)(0)(data)
    expect(result).toEqual([1, 0, 2, 3])
  })
  test('index is negative', () => {
    const data = [1, 2, 3];
    const result = L.insertAt(-2)(0)(data)
    expect(result).toEqual([1, 2, 0, 3])
  })
  test('positive index out of range', () => {
    const data = [1, 2, 3];
    const result = L.insertAt(10)(0)(data)
    expect(result).toEqual([1, 2, 3, 0])
  })
  test('negative index out of range', () => {
    const data = [1, 2, 3];
    const result = L.insertAt(-10)(0)(data)
    expect(result).toEqual([0, 1, 2, 3])
  })
})

