import assert from 'node:assert/strict';
import test from 'node:test';

import {
  FreeSemesterValueEnum,
  GraduationTypeValueEnum,
  LiberalSystemValueEnum,
  Step4FormType,
} from '@repo/types';

import { normalizeAchievements, normalizeArtsPhysicalAchievement } from './normalizeAchievements';

/** 테스트에서 다루는 필드만 채우고 나머지는 비워 둔다 — normalizeAchievements는
 * achievement1_1~3_2와 liberalSystem/freeSemester만 읽으므로 그 외 필드는 런타임에
 * 실제로 undefined일 수 있는 상태를 그대로 흉내낸다. */
const values = (overrides: Partial<Step4FormType>): Step4FormType =>
  ({
    liberalSystem: null,
    freeSemester: null,
    ...overrides,
  }) as Step4FormType;

test('자유학년제 졸업자가 OCR로 1-1·1-2에 값이 채워져도 null로 지운다(회귀 테스트)', () => {
  // 실제 버그: OCR이 자유학년제 1학년 성취도를 0('없음')으로 채워 제출하면서 성적 계산이 틀어졌다.
  const result = normalizeAchievements(
    values({
      liberalSystem: LiberalSystemValueEnum.FREE_GRADE,
      achievement1_1: [0, 0, 0],
      achievement1_2: [0, 0, 0],
      achievement2_1: [90, 85],
    }),
    GraduationTypeValueEnum.GRADUATE,
  );

  assert.equal(result.achievement1_1, null);
  assert.equal(result.achievement1_2, null);
  assert.deepEqual(result.achievement2_1, [90, 85]);
});

test('자유학년제 졸업예정자는 1-1·1-2뿐 아니라 아직 없는 3-2도 null로 지운다', () => {
  const result = normalizeAchievements(
    values({
      liberalSystem: LiberalSystemValueEnum.FREE_GRADE,
      achievement1_1: [0],
      achievement1_2: [0],
      achievement3_2: [0],
    }),
    GraduationTypeValueEnum.CANDIDATE,
  );

  assert.equal(result.achievement1_1, null);
  assert.equal(result.achievement1_2, null);
  assert.equal(result.achievement3_2, null);
});

test('아직 입력이 시작되지 않은 학기(undefined)는 미사용 학기여도 undefined 그대로 둔다', () => {
  // step 1~3 임시저장은 step 4 값이 전부 undefined인 채로 나가는데, 여기서 null로 바꾸면
  // 서버가 받아 오던 payload 모양이 달라진다.
  const result = normalizeAchievements(
    values({
      liberalSystem: LiberalSystemValueEnum.FREE_GRADE,
      achievement1_1: undefined,
    }),
    GraduationTypeValueEnum.GRADUATE,
  );

  assert.equal(result.achievement1_1, undefined);
});

test('자유학기제는 지정한 자유학기 한 학기만 null로 지우고 나머지는 그대로 둔다', () => {
  const result = normalizeAchievements(
    values({
      liberalSystem: LiberalSystemValueEnum.FREE_SEMESTER,
      freeSemester: FreeSemesterValueEnum['1-1'],
      achievement1_1: [0, 0],
      achievement1_2: [88, 92],
    }),
    GraduationTypeValueEnum.GRADUATE,
  );

  assert.equal(result.achievement1_1, null);
  assert.deepEqual(result.achievement1_2, [88, 92]);
});

test('사용 중인 학기의 값은 그대로 통과시킨다', () => {
  const result = normalizeAchievements(
    values({
      liberalSystem: LiberalSystemValueEnum.FREE_SEMESTER,
      freeSemester: null,
      achievement1_1: [77, 80],
    }),
    GraduationTypeValueEnum.GRADUATE,
  );

  assert.deepEqual(result.achievement1_1, [77, 80]);
});

const artsScores = (length: number) => Array.from({ length }, (_, index) => (index % 3) + 3);

test('졸업자로 채운 뒤 졸업예정으로 바꾸면 남아 있는 3학년 2학기 예체능 성적을 잘라낸다', () => {
  // 화면에서는 3학년 2학기 열이 사라지지만 값은 배열 끝에 남아, 그대로 보내면 서버가 평균에 넣는다.
  const graduateScores = artsScores(12);

  const result = normalizeArtsPhysicalAchievement(
    values({
      liberalSystem: LiberalSystemValueEnum.FREE_GRADE,
      artsPhysicalAchievement: graduateScores,
    }),
    GraduationTypeValueEnum.CANDIDATE,
  );

  assert.deepEqual(result, graduateScores.slice(0, 9));
});

test('자유학기제에서도 졸업예정의 기대 길이(15개)까지만 남긴다', () => {
  const graduateScores = artsScores(18);

  const result = normalizeArtsPhysicalAchievement(
    values({
      liberalSystem: LiberalSystemValueEnum.FREE_SEMESTER,
      freeSemester: FreeSemesterValueEnum['1-1'],
      artsPhysicalAchievement: graduateScores,
    }),
    GraduationTypeValueEnum.CANDIDATE,
  );

  assert.deepEqual(result, graduateScores.slice(0, 15));
});

test('기대 길이와 같거나 모자란 예체능 성적은 그대로 통과시킨다', () => {
  // 모자란 값을 채우거나 막는 것은 여기서 할 일이 아니다 — 임시저장은 작성 중인 값을 그대로 보낸다.
  const full = artsScores(12);
  const partial = artsScores(5);
  const form = (artsPhysicalAchievement: number[]) =>
    values({ liberalSystem: LiberalSystemValueEnum.FREE_GRADE, artsPhysicalAchievement });

  assert.deepEqual(
    normalizeArtsPhysicalAchievement(form(full), GraduationTypeValueEnum.GRADUATE),
    full,
  );
  assert.deepEqual(
    normalizeArtsPhysicalAchievement(form(partial), GraduationTypeValueEnum.GRADUATE),
    partial,
  );
});

test('예체능 성적이 없거나 졸업 유형을 모르면 값을 건드리지 않는다', () => {
  const scores = artsScores(12);

  assert.equal(
    normalizeArtsPhysicalAchievement(
      values({ liberalSystem: LiberalSystemValueEnum.FREE_GRADE }),
      GraduationTypeValueEnum.CANDIDATE,
    ),
    undefined,
  );
  assert.equal(
    normalizeArtsPhysicalAchievement(
      values({ artsPhysicalAchievement: null }),
      GraduationTypeValueEnum.GED,
    ),
    null,
  );
  // step 2를 채우기 전의 임시저장은 graduationType이 런타임에 undefined다
  assert.deepEqual(
    normalizeArtsPhysicalAchievement(
      values({ liberalSystem: LiberalSystemValueEnum.FREE_GRADE, artsPhysicalAchievement: scores }),
      undefined as unknown as GraduationTypeValueEnum,
    ),
    scores,
  );
});
