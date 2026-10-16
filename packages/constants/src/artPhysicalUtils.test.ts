import assert from 'node:assert/strict';
import test from 'node:test';

import {
  clearFreeSemesterArtsPhysical,
  getArtPhysicalIndexArray,
  getArtsPhysicalAchievementLength,
  getFreeSemesterArtsPhysicalIndices,
} from './artPhysicalUtils';

test('예체능 성적의 기대 길이는 졸업 유형과 전형에 따라 9/12/15/18이다', () => {
  assert.equal(
    getArtsPhysicalAchievementLength({ graduationType: 'CANDIDATE', liberalSystem: '자유학년제' }),
    9,
  );
  assert.equal(
    getArtsPhysicalAchievementLength({ graduationType: 'GRADUATE', liberalSystem: '자유학년제' }),
    12,
  );
  assert.equal(
    getArtsPhysicalAchievementLength({ graduationType: 'CANDIDATE', liberalSystem: '자유학기제' }),
    15,
  );
  assert.equal(
    getArtsPhysicalAchievementLength({ graduationType: 'GRADUATE', liberalSystem: '자유학기제' }),
    18,
  );
});

test('검정고시이거나 전형이 정해지지 않았으면 예체능 성적을 받지 않으므로 null이다', () => {
  assert.equal(
    getArtsPhysicalAchievementLength({ graduationType: 'GED', liberalSystem: '자유학년제' }),
    null,
  );
  assert.equal(
    getArtsPhysicalAchievementLength({ graduationType: 'GRADUATE', liberalSystem: null }),
    null,
  );
});

test('기대 길이는 입력 폼이 실제로 그리는 칸 수와 같다', () => {
  // 폼(ArtPhysicalForm)은 getArtPhysicalIndexArray의 registerIndexList대로 칸을 그린다.
  // 두 기준이 어긋나면 화면에서 채울 수 없는 칸을 요구하거나, 채운 칸을 검사하지 않게 된다.
  const cases = [
    { graduationType: 'CANDIDATE', liberalSystem: '자유학년제' },
    { graduationType: 'GRADUATE', liberalSystem: '자유학년제' },
    { graduationType: 'CANDIDATE', liberalSystem: '자유학기제' },
    { graduationType: 'GRADUATE', liberalSystem: '자유학기제' },
  ] as const;

  cases.forEach(({ graduationType, liberalSystem }) => {
    const renderedIndexes = getArtPhysicalIndexArray({
      graduationType,
      isFreeSemester: liberalSystem === '자유학기제',
      isFreeGrade: liberalSystem === '자유학년제',
    }).flatMap(({ registerIndexList }) => [...registerIndexList]);

    assert.equal(
      getArtsPhysicalAchievementLength({ graduationType, liberalSystem }),
      Math.max(...renderedIndexes) + 1,
    );
  });
});

test('자유학기 예체능 인덱스는 학기순번 × 3부터 과목 3칸이다', () => {
  assert.deepEqual(getFreeSemesterArtsPhysicalIndices('1-1'), [0, 1, 2]);
  assert.deepEqual(getFreeSemesterArtsPhysicalIndices('1-2'), [3, 4, 5]);
  assert.deepEqual(getFreeSemesterArtsPhysicalIndices('2-1'), [6, 7, 8]);
  assert.deepEqual(getFreeSemesterArtsPhysicalIndices('2-2'), [9, 10, 11]);
  assert.deepEqual(getFreeSemesterArtsPhysicalIndices('3-1'), [12, 13, 14]);
  assert.deepEqual(getFreeSemesterArtsPhysicalIndices(null), []);
});

test('자유학기 예체능 인덱스는 입력 폼이 그리는 자유학기 열의 칸과 같다', () => {
  // 자유학기제 표는 졸업예정·졸업자 모두 1학년 1학기부터 시작하므로 n번째 열의 칸이 곧 n번째 학기다.
  const semesters = ['1-1', '1-2', '2-1', '2-2', '3-1', '3-2'] as const;

  (['CANDIDATE', 'GRADUATE'] as const).forEach((graduationType) => {
    const indexArray = getArtPhysicalIndexArray({
      graduationType,
      isFreeSemester: true,
      isFreeGrade: false,
    });
    const columnCount = indexArray[0]?.registerIndexList.length ?? 0;

    semesters.slice(0, columnCount).forEach((semester, column) => {
      const renderedColumn = indexArray.map(({ registerIndexList }) => registerIndexList[column]);
      assert.deepEqual(getFreeSemesterArtsPhysicalIndices(semester), renderedColumn);
    });
  });
});

test('자유학기제면 자유학기 예체능 칸만 0으로 맞추고 원본 배열은 바꾸지 않는다', () => {
  const scores = [5, 5, 4, 5, 4, 3, 5, 5, 4];

  const result = clearFreeSemesterArtsPhysical({
    artsPhysicalAchievement: scores,
    liberalSystem: '자유학기제',
    freeSemester: '1-2',
  });

  assert.deepEqual(result, [5, 5, 4, 0, 0, 0, 5, 5, 4]);
  assert.deepEqual(scores, [5, 5, 4, 5, 4, 3, 5, 5, 4]);
});

test('자유학기제가 아니거나 자유학기를 정하지 않았으면 예체능 칸을 건드리지 않는다', () => {
  const scores = [5, 5, 4, 5, 4, 3];

  assert.equal(
    clearFreeSemesterArtsPhysical({
      artsPhysicalAchievement: scores,
      liberalSystem: '자유학년제',
      freeSemester: '1-1',
    }),
    scores,
  );
  assert.equal(
    clearFreeSemesterArtsPhysical({
      artsPhysicalAchievement: scores,
      liberalSystem: '자유학기제',
      freeSemester: null,
    }),
    scores,
  );
});

test('덜 채운 배열은 길이 안의 자유학기 칸만 0으로 맞추고 뒤에 빈 칸을 만들지 않는다', () => {
  assert.deepEqual(
    clearFreeSemesterArtsPhysical({
      artsPhysicalAchievement: [5, 4, 3, 5, 4],
      liberalSystem: '자유학기제',
      freeSemester: '1-2',
    }),
    [5, 4, 3, 0, 0],
  );
  assert.deepEqual(
    clearFreeSemesterArtsPhysical({
      artsPhysicalAchievement: [5, 4],
      liberalSystem: '자유학기제',
      freeSemester: '2-1',
    }),
    [5, 4],
  );
});
