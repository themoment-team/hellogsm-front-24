import { minutesToMs } from 'shared/utils';

describe('minutesToMs', () => {
  test('1분 -> 60000ms', () => {
    expect(minutesToMs(1)).toBe(60000);
  });

  test('5분 -> 300000ms', () => {
    expect(minutesToMs(5)).toBe(300000);
  });

  test('0분 -> 0ms', () => {
    expect(minutesToMs(0)).toBe(0);
  });
});