
import { getKoreanDate } from 'shared/utils';

describe('getKoreanDate', () => {
  test('한국 시간을 반환한다.', () => {
    const koreanDate = getKoreanDate();

    const now = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Seoul' });
    const [datePart, timePart] = now.split(', ');
    const [day, month, year] = datePart.split('/');
    const [hours, minutes] = timePart.split(':');

    expect(koreanDate.getUTCFullYear()).toBe(Number(year));
    expect(koreanDate.getUTCMonth() + 1).toBe(Number(month));
    expect(koreanDate.getUTCDate()).toBe(Number(day));
    expect(koreanDate.getUTCHours()).toBe(Number(hours));
    expect(koreanDate.getUTCMinutes()).toBe(Number(minutes));
  });
});
