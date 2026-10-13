import assert from 'node:assert/strict';
import test from 'node:test';

import { ARTS_PHYSICAL_SUBJECTS, GENERAL_SUBJECTS } from '@repo/constants';

import { FreeSemesterValueEnum, GraduationTypeValueEnum, LiberalSystemValueEnum } from '../value';

import { createStep4Schema, step4Schema } from './step4Schema';

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

/** 졸업 유형·전형별로 일반교과와 비교과를 전부 채운 상태. 예체능 성적만 테스트마다 바꿔 넣는다. */
const lengthCases = [
  {
    name: '졸업예정 + 자유학년제',
    graduationType: GraduationTypeValueEnum.CANDIDATE,
    expectedLength: 9,
    values: freeGradeValues,
  },
  {
    name: '졸업자 + 자유학년제',
    graduationType: GraduationTypeValueEnum.GRADUATE,
    expectedLength: 12,
    values: { ...freeGradeValues, achievement3_2: generalScores },
  },
  {
    name: '졸업예정 + 자유학기제',
    graduationType: GraduationTypeValueEnum.CANDIDATE,
    expectedLength: 15,
    values: {
      ...freeGradeValues,
      liberalSystem: LiberalSystemValueEnum.FREE_SEMESTER,
      freeSemester: FreeSemesterValueEnum['1-1'],
      achievement1_2: generalScores,
    },
  },
  {
    name: '졸업자 + 자유학기제',
    graduationType: GraduationTypeValueEnum.GRADUATE,
    expectedLength: 18,
    values: {
      ...freeGradeValues,
      liberalSystem: LiberalSystemValueEnum.FREE_SEMESTER,
      freeSemester: FreeSemesterValueEnum['1-1'],
      achievement1_2: generalScores,
      achievement3_2: generalScores,
    },
  },
];

const artsScores = (length: number) => Array.from({ length }, () => 5);

const issuePathsFor = (graduationType: GraduationTypeValueEnum | null, values: unknown) => {
  const result = createStep4Schema(graduationType).safeParse(values);

  // 9개 미만이면 step4Schema의 min(9)와 길이 검사가 같은 경로로 한 번씩 걸리므로 중복을 합친다
  return result.success ? [] : [...new Set(result.error.issues.map(({ path }) => path.join('.')))];
};

lengthCases.forEach(({ name, graduationType, expectedLength, values }) => {
  test(`${name}: 예체능 성적 ${expectedLength}개를 전부 채우면 통과한다`, () => {
    assert.deepEqual(
      issuePathsFor(graduationType, {
        ...values,
        artsPhysicalAchievement: artsScores(expectedLength),
      }),
      [],
    );
  });

  test(`${name}: 예체능 성적이 ${expectedLength - 1}개면 실패한다`, () => {
    assert.deepEqual(
      issuePathsFor(graduationType, {
        ...values,
        artsPhysicalAchievement: artsScores(expectedLength - 1),
      }),
      ['artsPhysicalAchievement'],
    );
  });
});

test('자유학년제 졸업자가 마지막 칸을 비운 11개로는 통과하지 못한다(회귀 테스트)', () => {
  // 실제 버그: 스키마가 min(9)만 검사해 [5 × 11]이 그대로 제출됐고, 서버는 길이를 보지 않아
  // 빈 칸(3학년 2학기 미술)이 평균에서 빠진 점수를 계산했다.
  const values = {
    ...freeGradeValues,
    achievement3_2: generalScores,
    artsPhysicalAchievement: artsScores(11),
  };

  assert.equal(step4Schema.safeParse(values).success, true);
  assert.deepEqual(issuePathsFor(GraduationTypeValueEnum.GRADUATE, values), [
    'artsPhysicalAchievement',
  ]);
});

test('졸업자로 채운 뒤 졸업예정으로 바꿔 예체능 성적이 남아도 통과한다', () => {
  // 화면에 없는 3학년 2학기 칸은 사용자가 지울 수 없다. 남은 칸은 제출 직전에 잘라낸다.
  assert.deepEqual(
    issuePathsFor(GraduationTypeValueEnum.CANDIDATE, {
      ...freeGradeValues,
      artsPhysicalAchievement: artsScores(12),
    }),
    [],
  );
});

test('검정고시는 graduationType을 넘겨도 예체능 성적 없이 통과한다', () => {
  assert.deepEqual(issuePathsFor(GraduationTypeValueEnum.GED, gedValues), []);
});

test('graduationType을 아직 모르면 step4Schema와 같은 기준(9개 이상)으로 검사한다', () => {
  const values = { ...freeGradeValues, achievement3_2: generalScores };

  assert.deepEqual(issuePathsFor(null, { ...values, artsPhysicalAchievement: artsScores(9) }), []);
  assert.deepEqual(issuePathsFor(null, { ...values, artsPhysicalAchievement: artsScores(8) }), [
    'artsPhysicalAchievement',
  ]);
});
