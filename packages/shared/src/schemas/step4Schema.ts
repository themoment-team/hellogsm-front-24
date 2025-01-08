import { FreeSemesterValueEnum, LiberalSystemValueEnum } from 'types';
import { z } from 'zod';

import { GED_MAX_SCORE, MAX_SCORE, MIN_SCORE } from 'shared/constants';
import { getValuesByEnum } from 'shared/utils';

export const step4Schema = z.object({
  liberalSystem: z.nullable(z.enum(getValuesByEnum(LiberalSystemValueEnum))),
  achievement1_2: z.nullable(
    z.array(z.number().refine((value) => MAX_SCORE >= value && value >= MIN_SCORE)),
  ),
  achievement2_1: z.nullable(
    z.array(z.number().refine((value) => MAX_SCORE >= value && value >= MIN_SCORE)),
  ),
  achievement2_2: z.nullable(
    z.array(z.number().refine((value) => MAX_SCORE >= value && value >= MIN_SCORE)),
  ),
  achievement3_1: z.nullable(
    z.array(z.number().refine((value) => MAX_SCORE >= value && value >= MIN_SCORE)),
  ),
  achievement3_2: z.nullable(
    z.array(z.number().refine((value) => MAX_SCORE >= value && value >= MIN_SCORE)),
  ),
  newSubjects: z.optional(z.array(z.string().min(1))),
  artsPhysicalAchievement: z.nullable(
    z.array(z.number().refine((value) => MAX_SCORE >= value && value >= MIN_SCORE)),
  ),
  absentDays: z.nullable(z.array(z.number().refine((value) => !isNaN(value)))),
  attendanceDays: z.nullable(z.array(z.number().refine((value) => !isNaN(value)))),
  volunteerTime: z.nullable(z.array(z.number().refine((value) => !isNaN(value)))),
  freeSemester: z.nullable(z.enum(getValuesByEnum(FreeSemesterValueEnum))),
  gedTotalScore: z.nullable(z.number().refine((value) => !isNaN(value) && value <= GED_MAX_SCORE)),
});
