import { cond } from '../src/util';

describe('cond', () => {
  test('should execute the matched function', () => {
    const value = 3;
    const result = cond([
      [n => n < 2, () => 2],
      [n => n >= 2, n => n + 1],
      [true, n => n]
    ])(3);
    expect(result).toBe(4);
  });
});
