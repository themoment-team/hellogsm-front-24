import { getValuesByEnum } from 'shared/utils';

enum Status {
  A = 'A',
  B = 'B',
  C = 'C',
}

describe('getValuesByEnum', () => {
  test('enum의 값을 배열로 반환한다.', () => {
    const result = getValuesByEnum(Status);
    expect(result).toEqual(['A', 'B', 'C']);
  });
});
