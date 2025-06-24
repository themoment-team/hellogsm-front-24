import { formattedBirthDate } from 'shared/utils';

describe('formattedBirthDate', () => {
  test('한 자리 월/일을 두 자리로 변환한다', () => {
    const birth = { year: '2008', month: '2', day: '7' };

    expect(formattedBirthDate(birth)).toBe('2008-02-07');
  });

  test('두 자리 월/일은 그대로 유지한다', () => {
    const birth = { year: '2008', month: '02', day: '27' };

    expect(formattedBirthDate(birth)).toBe('2008-02-27');
  });

  test('월만 한 자리, 일은 두 자리인 경우', () => {
    const birth = { year: '2008', month: '4', day: '26' };

    expect(formattedBirthDate(birth)).toBe('2008-04-26');
  });

  test('일만 한 자리, 월은 두 자리인 경우', () => {
    const birth = { year: '2008', month: '07', day: '3' };

    expect(formattedBirthDate(birth)).toBe('2008-07-03');
  });
}); 