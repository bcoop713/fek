import * as F from '../src/adt';
import C from '../src/constants';

describe('match', () => {
  test('calls the matched function', () => {
    const instance = {
      [C.value]: 1,
      [C.type]: 'Just',
      [C.keys]: ['Just', 'Nothing']
    };
    const pattern = {
      Just: jest.fn(val => val),
      Nothing: () => {}
    };
    const result = F.match(pattern)(instance);

    expect(result).toBe(1);
    expect(pattern.Just.mock.calls[0][0]).toBe(1);
  });
  test('warns if missing keys', () => {
    global.console = {
      warn: jest.fn(),
    };
    const instance = {
      [C.value]: 1,
      [C.type]: 'Just',
      [C.keys]: ['Just', 'Nothing']
    };
    const pattern = {
      Just: jest.fn(val => val)
    };
    const result = F.match(pattern)(instance);

    expect(console.warn).toBeCalled();
  });
  test('calls default if no match', () => {
    const instance = {
      [C.value]: 1,
      [C.type]: 'OtherKey',
      [C.keys]: ['Just', 'Nothing']
    };
    const pattern = {
      Just: jest.fn(val => val),
      Default: jest.fn(val => val)
    };
    const result = F.match(pattern)(instance);

    expect(result).toBe(1);
    expect(pattern.Default.mock.calls[0][0]).toBe(1);
  });
});

describe('union', () => {
  test('creates new union instance', () => {
    const maybe = F.union({
      Just: val => val,
      Nothing: () => null
    });
    const just = maybe.Just(1);
    const justExpected = {
      [C.value]: 1,
      [C.keys]: ['Just', 'Nothing'],
      [C.type]: 'Just'
    };
    const nothing = maybe.Nothing();
    const nothingExpected = {
      [C.value]: null,
      [C.keys]: ['Just', 'Nothing'],
      [C.type]: 'Nothing'
    };
    expect(just).toEqual(justExpected);
    expect(nothing).toEqual(nothingExpected);
  });
});

describe('isMember', () => {
  test('true', () => {
    const instance = {
      [C.value]: 1,
      [C.type]: 'Just',
      [C.keys]: ['Just', 'Nothing']
    };
    const result = F.isMember('Just')(instance);
    expect(result).toBe(true);
  });
  test('false', () => {
    const instance = {
      [C.value]: 1,
      [C.type]: 'Just',
      [C.keys]: ['Just', 'Nothing']
    };
    const result = F.isMember('Nothing')(instance);
    expect(result).toBe(false);
  });
});

describe('integrations', () => {
  test('matching union', () => {
    const result = F.union({
      Ok: val => val,
      Error: error => error
    });
    const ok = result.Ok(1);
    const error = result.Error('Server Borked');
    const pattern = {
      Ok: val => val + 1,
      Error: error => `Error: ${error}`
    };
    const okResult = F.match(pattern)(ok);
    const errorResult = F.match(pattern)(error);
    expect(okResult).toBe(2);
    expect(errorResult).toBe('Error: Server Borked');
  });
});
