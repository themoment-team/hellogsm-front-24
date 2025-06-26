import { FreeSemesterValueEnum, GraduationTypeValueEnum, LiberalSystemValueEnum } from 'types';
import { z } from 'zod';

import {
  ARTS_PHYSICAL_SUBJECTS,
  GED_MAX_SCORE,
  GENERAL_SUBJECTS,
  MAX_SCORE,
  MIN_SCORE,
} from 'shared/constants';
import { getValuesByEnum } from 'shared/utils';

const achievementSchema = (minLength: number) =>
  z.nullable(
    z.array(z.number().refine((value) => MAX_SCORE >= value && value >= MIN_SCORE)).min(minLength),
  );

const nonSubjectSchema = z.nullable(z.array(z.number().refine((value) => !isNaN(value))));

export const getStep4Schema = ({
  graduationType,
  liberalSystem,
  freeSemester,
}: {
  graduationType: GraduationTypeValueEnum;
  liberalSystem: LiberalSystemValueEnum | null;
  freeSemester: FreeSemesterValueEnum | null;
}) => {
  const artsSubjectCount = ARTS_PHYSICAL_SUBJECTS.length;
  let semesterCount = 0;

  if (graduationType === GraduationTypeValueEnum.GRADUATE) {
    semesterCount = 4;
  } else if (graduationType === GraduationTypeValueEnum.CANDIDATE) {
    semesterCount = liberalSystem === LiberalSystemValueEnum.FREE_GRADE ? 3 : 5;
  }

  const artsLength = semesterCount
    ? artsSubjectCount * (semesterCount - (freeSemester ? 1 : 0))
    : artsSubjectCount * semesterCount;

  return z.object({
    liberalSystem: z.nullable(z.enum(getValuesByEnum(LiberalSystemValueEnum))),
    achievement1_1: achievementSchema(GENERAL_SUBJECTS.length),
    achievement1_2: achievementSchema(GENERAL_SUBJECTS.length),
    achievement2_1: achievementSchema(GENERAL_SUBJECTS.length),
    achievement2_2: achievementSchema(GENERAL_SUBJECTS.length),
    achievement3_1: achievementSchema(GENERAL_SUBJECTS.length),
    achievement3_2: achievementSchema(GENERAL_SUBJECTS.length),
    newSubjects: z.optional(z.array(z.string().min(1))),
    artsPhysicalAchievement: achievementSchema(artsLength),
    absentDays: nonSubjectSchema,
    attendanceDays: nonSubjectSchema,
    volunteerTime: nonSubjectSchema,
    freeSemester: z.nullable(z.enum(getValuesByEnum(FreeSemesterValueEnum))),
    gedTotalScore: z.nullable(
      z.number().refine((value) => !isNaN(value) && value <= GED_MAX_SCORE),
    ),
  });
};
