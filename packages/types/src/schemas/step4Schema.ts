import { z } from 'zod';

import {
  ARTS_PHYSICAL_SUBJECTS,
  GED_MAX_SCORE,
  GED_MIN_SCORE,
  GENERAL_SUBJECTS,
  getArtsPhysicalAchievementLength,
  MAX_SCORE,
  MIN_SCORE,
} from '@repo/constants';

import { getValuesByEnum } from '../getValuesByEnum';
import { FreeSemesterValueEnum, GraduationTypeValueEnum, LiberalSystemValueEnum } from '../value';

const FORBIDDEN_SUBJECTS: string[] = [...ARTS_PHYSICAL_SUBJECTS, ...GENERAL_SUBJECTS];

const achievementSchema = (minLength: number) =>
  z.nullable(
    z.array(z.number().refine((value) => MAX_SCORE >= value && value >= MIN_SCORE)).min(minLength),
  );

const artsPhysicalAchievementSchema = (minLength: number) =>
  z.nullable(
    z.array(z.number().refine((value) => MAX_SCORE >= value && value >= MIN_SCORE)).min(minLength),
  );

const nonSubjectSchema = z.nullable(
  z.array(z.number().refine((value) => !isNaN(value) && value >= 0)),
);

export const step4Schema = z
  .object({
    liberalSystem: z.nullable(z.enum(getValuesByEnum(LiberalSystemValueEnum))),
    achievement1_1: achievementSchema(GENERAL_SUBJECTS.length),
    achievement1_2: achievementSchema(GENERAL_SUBJECTS.length),
    achievement2_1: achievementSchema(GENERAL_SUBJECTS.length),
    achievement2_2: achievementSchema(GENERAL_SUBJECTS.length),
    achievement3_1: achievementSchema(GENERAL_SUBJECTS.length),
    achievement3_2: achievementSchema(GENERAL_SUBJECTS.length),
    newSubjects: z.optional(
      z
        .array(
          z
            .string()
            .transform((val) => val.trim())
            .refine((val) => val.length > 0, {
              message: '과목명을 입력해주세요.',
            })
            .refine((item) => !FORBIDDEN_SUBJECTS.includes(item), {
              message: '기본 과목이 작성되어 있습니다.',
            }),
        )
        .superRefine((items, ctx) => {
          const valueToIndexesMap = new Map<string, number[]>();

          items.forEach((value, index) => {
            const indexes = valueToIndexesMap.get(value) || [];
            indexes.push(index);
            valueToIndexesMap.set(value, indexes);
          });

          valueToIndexesMap.forEach((indexes) => {
            if (indexes.length <= 1) return;
            const duplicateIndexesExcludingFirst = indexes.slice(1);
            duplicateIndexesExcludingFirst.forEach((dupIndex) => {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: [dupIndex],
                message: '과목이 중복되어 작성되어 있습니다.',
              });
            });
          });
        }),
    ),
    artsPhysicalAchievement: artsPhysicalAchievementSchema(ARTS_PHYSICAL_SUBJECTS.length * 3),
    absentDays: nonSubjectSchema,
    attendanceDays: nonSubjectSchema,
    volunteerTime: nonSubjectSchema,
    freeSemester: z.nullable(z.enum(getValuesByEnum(FreeSemesterValueEnum))),
    gedAvgScore: z.nullable(
      z
        .number()
        .refine((value) => !isNaN(value) && value <= GED_MAX_SCORE && value >= GED_MIN_SCORE),
    ),
  })
  .superRefine((data, ctx) => {
    // artsPhysicalAchievement가 nullable인 건 검정고시 때문이다 — 검정고시는 liberalSystem까지
    // 전부 null로 둔다. liberalSystem이 있는 일반 전형에서 예체능 성적이 통째로 null이면
    // (자유학기제/자유학년제 스위치를 누르면 초기화된다) 서버가 400으로 거부하므로 여기서 막는다.
    if (data.liberalSystem !== null && data.artsPhysicalAchievement === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['artsPhysicalAchievement'],
      });
    }

    if (data.liberalSystem === LiberalSystemValueEnum.FREE_SEMESTER) {
      const hasAchievement11 =
        data.achievement1_1 &&
        data.achievement1_1.some((score) => score !== null && score !== undefined);
      const hasAchievement12 =
        data.achievement1_2 &&
        data.achievement1_2.some((score) => score !== null && score !== undefined);

      if ((hasAchievement11 || hasAchievement12) && !data.freeSemester) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['freeSemester'],
        });
      }
    }
  });

/**
 * 예체능 성적 길이는 졸업 유형과 전형(자유학기제/자유학년제)에 따라 9/12/15/18개로 달라지는데,
 * graduationType은 step 2 값이라 step4Schema만으로는 알 수 없다. 그래서 graduationType을 받아
 * 길이까지 검사하는 스키마를 만든다. graduationType을 아직 모르면 step4Schema와 똑같이 동작한다.
 *
 * 실제 버그: step4Schema는 min(9)만 검사해서, 자유학년제 졸업자가 마지막 칸을 비운 11개짜리
 * 배열로도 제출 버튼이 활성화됐다. 서버도 길이를 보지 않아 빈 칸이 평균에서 빠진 점수가 계산됐다.
 *
 * 기대 길이보다 긴 경우는 막지 않는다 — 졸업자로 채운 뒤 졸업예정으로 바꾸면 화면에 없는
 * 3학년 2학기 칸이 값에 남는데, 이걸 오류로 잡으면 사용자가 고칠 방법이 없다. 남은 칸은 서버로
 * 나가기 직전에 normalizeArtsPhysicalAchievement가 잘라낸다.
 */
export const createStep4Schema = (graduationType?: GraduationTypeValueEnum | null) =>
  step4Schema.superRefine((data, ctx) => {
    if (!graduationType || data.artsPhysicalAchievement === null) return;

    const expectedLength = getArtsPhysicalAchievementLength({
      graduationType,
      liberalSystem: data.liberalSystem,
    });

    if (expectedLength !== null && data.artsPhysicalAchievement.length < expectedLength) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['artsPhysicalAchievement'],
      });
    }
  });
