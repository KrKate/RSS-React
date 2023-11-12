import { test, expect } from 'vitest';

function sum(a, b, c) {
  return a + b + c;
}

test('1+2+3', () => {
  expect(sum(1, 2, 3)).toEqual(6);
});
