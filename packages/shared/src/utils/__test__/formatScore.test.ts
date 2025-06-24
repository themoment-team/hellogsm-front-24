import { formatScore } from 'shared/utils';

describe('formatScore', () => {
  test('문자열 "85점"을 입력하면 "85.00"이 된다', () => {
    expect(formatScore('85점')).toBe('85.00');
  });

  test('"123.456%" 입력하면 "100.00"이 된다', () => {
    expect(formatScore('123.456%')).toBe('100.00');
  });

  test('"99.999" 입력하면 "100.00"이 된다', () => {
    expect(formatScore('99.999')).toBe('100.00');
  });

  test('"abc100.999xyz" 입력하면 "100.00"이 된다', () => {
    expect(formatScore('abc100.999xyz')).toBe('100.00');
  });

  test('"80.999" 입력하면 "81.00"이 된다', () => {
    expect(formatScore('80.999')).toBe('81.00');
  });
});
