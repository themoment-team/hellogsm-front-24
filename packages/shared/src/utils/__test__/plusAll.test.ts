import { plusAll } from 'shared/utils';

describe('plusAll', () => {
  test('1차원 배열의 모든 수를 더한다.', () => {
    expect(plusAll([1, 2, 3])).toBe(6);
  });

  test('2차원 배열의 모든 수를 더한다.', () => {
    expect(plusAll([[1, 2], [3, 4]])).toBe(10);
  });

  test('빈 배열의 경우 0을 반환한다.', () => {
    expect(plusAll([])).toBe(0);
    expect(plusAll([[]])).toBe(0);
  });
});
