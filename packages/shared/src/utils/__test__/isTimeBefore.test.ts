import { isTimeBefore } from 'shared/utils';

describe('isTimeBefore', () => {
  test('비교 시간이 기준 시간보다 이전인 경우 true를 반환한다', () => {
    const baseTime = new Date('2025-01-01T00:00:00Z');
    const compareTime = new Date('2020-01-01T00:00:00Z');
    
    expect(isTimeBefore({ baseTime, compareTime })).toBe(true);
  });

  test('비교 시간이 기준 시간보다 이후인 경우 false를 반환한다', () => {
    const baseTime = new Date('2025-01-01T00:00:00Z');
    const compareTime = new Date('2030-01-01T00:00:00Z');
    
    expect(isTimeBefore({ baseTime, compareTime })).toBe(false);
  });

  test('비교 시간이 기준 시간과 같은 경우 false를 반환한다', () => {
    const baseTime = new Date('2025-01-01T00:00:00Z');
    const compareTime = new Date('2025-01-01T00:00:00Z');
    
    expect(isTimeBefore({ baseTime, compareTime })).toBe(false);
  });
}); 