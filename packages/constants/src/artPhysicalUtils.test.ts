import assert from 'node:assert/strict';
import test from 'node:test';

import { getArtPhysicalIndexArray, getArtsPhysicalAchievementLength } from './artPhysicalUtils';

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
