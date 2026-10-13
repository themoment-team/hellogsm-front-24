import assert from 'node:assert/strict';
import test from 'node:test';

import { ARTS_PHYSICAL_SUBJECTS, GENERAL_SUBJECTS } from '@repo/constants';

import { FreeSemesterValueEnum, LiberalSystemValueEnum } from '../value';

import { step4Schema } from './step4Schema';

const generalScores = GENERAL_SUBJECTS.map(() => 5);
const artsPhysicalScores = Array.from({ length: ARTS_PHYSICAL_SUBJECTS.length * 3 }, () => 5);

/** 자유학년제 졸업예정자가 step 4를 전부 채운 상태 */
const freeGradeValues = {
  liberalSystem: LiberalSystemValueEnum.FREE_GRADE,
  achievement1_1: null,
  achievement1_2: null,
  achievement2_1: generalScores,
  achievement2_2: generalScores,
  achievement3_1: generalScores,
  achievement3_2: null,
  artsPhysicalAchievement: artsPhysicalScores,
  absentDays: [0, 0, 0],
  attendanceDays: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  volunteerTime: [0, 0, 0],
  freeSemester: null,
  gedAvgScore: null,
};

/** 검정고시는 Step4Register가 gedAvgScore를 뺀 나머지를 전부 null로 둔다 */
const gedValues = {
  liberalSystem: null,
  achievement1_1: null,
  achievement1_2: null,
  achievement2_1: null,
  achievement2_2: null,
  achievement3_1: null,
  achievement3_2: null,
  artsPhysicalAchievement: null,
  absentDays: null,
  attendanceDays: null,
  volunteerTime: null,
  freeSemester: null,
  gedAvgScore: 80,
};

const issuePaths = (values: unknown) => {
  const result = step4Schema.safeParse(values);

  return result.success ? [] : result.error.issues.map(({ path }) => path.join('.'));
};

test('자유학년제에서 예체능 성적까지 전부 채우면 통과한다', () => {
  assert.equal(step4Schema.safeParse(freeGradeValues).success, true);
});

test('자유학년제에서 예체능 성적이 통째로 null이면 실패한다(회귀 테스트)', () => {
  // 실제 버그: 자유학기제 ↔ 자유학년제 스위치를 누르면 예체능 성적이 null로 초기화되는데,
  // 스키마가 이를 통과시켜 제출 버튼이 활성화됐고 서버가 400을 반환했다.
  assert.deepEqual(issuePaths({ ...freeGradeValues, artsPhysicalAchievement: null }), [
    'artsPhysicalAchievement',
  ]);
});

test('자유학기제에서 예체능 성적이 통째로 null이면 실패한다', () => {
  assert.deepEqual(
    issuePaths({
      ...freeGradeValues,
      liberalSystem: LiberalSystemValueEnum.FREE_SEMESTER,
      freeSemester: FreeSemesterValueEnum['1-1'],
      achievement1_2: generalScores,
      artsPhysicalAchievement: null,
    }),
    ['artsPhysicalAchievement'],
  );
});

test('검정고시는 예체능 성적이 null이어도 통과한다', () => {
  assert.equal(step4Schema.safeParse(gedValues).success, true);
});
