import * as F from '../src/adt';

describe('match', () => {
  test('calls the matched function', () => {
    const instance = {
      value: 1,
      type: 'Just'
    }
    const pattern = {
      Just: jest.fn((val) => val)
    }
    const result = F.match(pattern)(instance)

    expect(result).toBe(1)
    expect(pattern.Just.mock.calls[0][0]).toBe(1)
  })
})

describe('union', () => {
  test('creates new union instance', () => {
    const maybe = F.union({
      Just: (val) => val,
      Nothing: () => null
    })
    const just = maybe.Just(1)
    const justExpected = {
      value: 1,
      keys: ['Just', 'Nothing'],
      type: 'Just'
    }
    const nothing = maybe.Nothing()
    const nothingExpected = {
      value: null,
      keys: ['Just', 'Nothing'],
      type: 'Nothing'
    }
    expect(just).toEqual(justExpected)
    expect(nothing).toEqual(nothingExpected)
  })
})

describe('integrations', () => {
  test('matching union', () => {
    const result = F.union({
      Ok: (val) => val,
      Error: (error) => error
    })
    const ok = result.Ok(1)
    const error = result.Error("Server Borked")
    const pattern = {
      Ok: (val) => val + 1,
      Error: (error) => `Error: ${error}`
    }
    const okResult = F.match(pattern)(ok)
    const errorResult = F.match(pattern)(error)
    expect(okResult).toBe(2)
    expect(errorResult).toBe('Error: Server Borked')
  })
})
