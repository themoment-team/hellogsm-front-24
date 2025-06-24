import { checkIsPassedDate } from 'shared/utils';

describe('checkIsPassedDate', () => {
  test('targetDate가 과거일 때 true를 반환한다', () => {
    const targetDate = new Date('2025-01-01');

    expect(checkIsPassedDate(targetDate)).toBe(true);
  });

  test('targetDate가 현재와 같을 때 true를 반환한다', () => {
    const targetDate = new Date();
    
    expect(checkIsPassedDate(targetDate)).toBe(true);
  });

  test('targetDate가 미래일 때 false를 반환한다', () => {
    const targetDate = new Date('2030-01-01');

    expect(checkIsPassedDate(targetDate)).toBe(false);
  });
}); 