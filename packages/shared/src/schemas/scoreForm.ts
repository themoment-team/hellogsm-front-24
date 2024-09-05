import { z } from 'zod';

const DEFAULT_VALUE = '성적 선택';

export const scoreFormSchema = z.object({
  achievement1_2: z.nullable(
    z.array(z.string().refine((value) => value && value !== DEFAULT_VALUE)),
  ),
  achievement2_1: z.nullable(
    z.array(z.string().refine((value) => value && value !== DEFAULT_VALUE)),
  ),
  achievement2_2: z.nullable(
    z.array(z.string().refine((value) => value && value !== DEFAULT_VALUE)),
  ),
  achievement3_1: z.nullable(
    z.array(z.string().refine((value) => value && value !== DEFAULT_VALUE)),
  ),
  achievement3_2: z.nullable(
    z.array(z.string().refine((value) => value && value !== DEFAULT_VALUE)),
  ),
  newSubjects: z.nullable(z.array(z.string().min(1))),
  artsPhysicalAchievement: z.nullable(
    z.array(z.string().refine((value) => value && value !== DEFAULT_VALUE)),
  ),
  absentDays: z.nullable(z.array(z.string().refine((value) => !isNaN(Number(value)) && value))),
  attendanceDays: z.nullable(z.array(z.string().refine((value) => !isNaN(Number(value)) && value))),
  volunteerTime: z.nullable(z.array(z.string().refine((value) => !isNaN(Number(value)) && value))),
  gedTotalScore: z.nullable(
    z.string().refine((value) => !isNaN(Number(value)) && Number(value) <= 600),
  ),
});
