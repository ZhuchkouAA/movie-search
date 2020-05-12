import { isEmpty } from './pureFunctions';

test('isEmpty', () => {
  expect(isEmpty({})).toBe(true);
  expect(isEmpty()).toBe(true);
  expect(isEmpty('')).toBe(true);
  expect(isEmpty(' ')).toBe(true);
  expect(isEmpty(null)).toBe(true);
  expect(isEmpty([])).toBe(true);
  const arr = [];
  arr.length = 5;
  expect(isEmpty(arr)).toBe(true);
});
test('isNotEmpty', () => {
  expect(isEmpty({ key: 1 })).toBe(false);
  expect(isEmpty([{ key: 1 }])).toBe(false);
  expect(isEmpty([1])).toBe(false);
  expect(isEmpty(true)).toBe(false);
  expect(isEmpty(false)).toBe(false);
});
