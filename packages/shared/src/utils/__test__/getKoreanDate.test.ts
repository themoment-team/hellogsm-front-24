import { getKoreanDate } from 'shared/utils';

describe('getKoreanDate', () => {
  test('getKoreanDate를 호출하면 Asia/Seoul 타임존의 현재 날짜와 시간이 반환되어야 한다.', () => {
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
