import {
  isString,
  isNumber,
  Maybe,
  validate,
  mapValidator,
  Obj,
  List,
  Tuple
} from '../src/schema';
import { Ok, Error } from '../src/result';
import { Just, Nothing } from '../src/maybe';

describe('string validation integration', () => {
  test('ok', () => {
    const data = 'test';
    const validator = isString;
    const result = validate(validator)(data);
    const expected = Ok('test');
    expect(result).toEqual(expected);
  });
  test('error', () => {
    const data = 3;
    const validator = isString;
    const result = validate(validator)(data);
    const expected = Error({ expected: 'string', received: 3, path: [] });
    expect(result).toEqual(expected);
  });
});

describe('number validation integration', () => {
  test('ok', () => {
    const data = 1;
    const validator = isNumber;
    const result = validate(validator)(data);
    const expected = Ok(1);
    expect(result).toEqual(expected);
  });
  test('error', () => {
    const data = 'test';
    const validator = isNumber;
    const result = validate(validator)(data);
    const expected = Error({ expected: 'number', received: 'test', path: [] });
    expect(result).toEqual(expected);
  });
});

describe('object', () => {
  test('ok', () => {
    const data = {
      key1: 'string1',
      key2: [1, 2, 3, 4],
      key3: { key4: 'string4' }
    };
    const validator = Obj({
      key1: isString,
      key2: List(isNumber),
      key3: Obj({
        key4: isString
      })
    });
    const result = validate(validator)(data);
    const expected = Ok(data);
    expect(result).toEqual(expected);
  });
  test('error', () => {
    const data = {
      key1: 'string1',
      key2: 3,
      key3: { key4: 2 }
    };
    const validator = Obj({
      key1: isString,
      key2: isString,
      key3: Obj({
        key4: isString
      })
    });
    const result = validate(validator)(data);
    const expected = Error([
      { expected: 'string', received: 3, path: ['key2'] },
      { expected: 'string', received: 2, path: ['key3', 'key4'] }
    ]);
    expect(result).toEqual(expected);
  });
  test('missing key', () => {
    const data = {
      key1: 'string1',
      key3: { key4: 'string4' }
    };
    const validator = Obj({
      key1: isString,
      key2: isString,
      key3: Obj({
        key4: isString
      }),
      key5: Obj({
        key6: isString
      })
    });
    const result = validate(validator)(data);
    const expected = Error([
      { expected: 'string', received: undefined, path: ['key2'] },
      { expected: 'object', received: undefined, path: ['key5'] }
    ]);
    expect(result).toEqual(expected);
  });
});

describe('tuple', () => {
  test('ok', () => {
    const data = [1, 'string1'];
    const validator = Tuple([isNumber, isString]);
    const result = validate(validator)(data);
    expect(result).toEqual(Ok(data));
  });
  test('error', () => {
    const data = [1, 'string1'];
    const validator = Tuple([isNumber, isNumber]);
    const result = validate(validator)(data);
    const expected = Error([
      { expected: 'number', received: 'string1', path: [1] }
    ]);
    expect(result).toEqual(expected);
  });
  test('missing values', () => {
    const data = [1];
    const validator = Tuple([isNumber, isNumber]);
    const result = validate(validator)(data);
    const expected = Error([
      { expected: 'number', received: undefined, path: [1] }
    ]);
    expect(result).toEqual(expected);
  });
});

describe('coercion', () => {
  test('just', () => {
    const data = 1;
    const validator = Maybe(isNumber);
    const result = validate(validator)(data);
    const expected = Ok(Just(1));
    expect(result).toEqual(expected);
  });
  test('nothing', () => {
    const data = null;
    const validator = Maybe(isNumber);
    const result = validate(validator)(data);
    const expected = Ok(Nothing());
    expect(result).toEqual(expected);
  });
  test('error', () => {
    const data = 'string1';
    const validator = Maybe(isNumber);
    const result = validate(validator)(data);
    const expected = Error({
      expected: 'number',
      received: 'string1',
      path: []
    });
    expect(result).toEqual(expected);
  });
  test('object with maybe', () => {
    const data = {
      key1: 1,
      key2: null,
      key3: { key4: 1 }
    };
    const validator = Obj({
      key1: isNumber,
      key2: Maybe(isString),
      key3: Maybe(Obj({ key4: isNumber }))
    });
    const result = validate(validator)(data);
    const expected = Ok({
      key1: 1,
      key2: Nothing(),
      key3: Just({ key4: 1 })
    });
    expect(result).toEqual(expected);
  });
  test('maybe object', () => {
    const data = {
      key1: 'string1'
    }
    const validator = Maybe(Obj({key1: isString}))
    const result = validate(validator)(data)
    expect(result).toEqual(Ok(Just(data)))
  })
  test('list with maybe', () => {
    const data = [1, 2, null]
    const validator = List(Maybe(isNumber));
    const result = validate(validator)(data);
    const expected = Ok([Just(1), Just(2), Nothing()]);
    expect(result).toEqual(expected);
  });
  test('tuple with maybe', () => {
    const data = [1, 'string1', null]
    const validator = Tuple([isNumber, isString, Maybe(isNumber)]);
    const result = validate(validator)(data);
    const expected = Ok([1, 'string1', Nothing()]);
    expect(result).toEqual(expected);
  });
});
