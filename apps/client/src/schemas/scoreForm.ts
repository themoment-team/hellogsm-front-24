import { z } from 'zod';

const DEFAULT_VALUE = '선택';

export const scoreFormSchema = z.object({
  achievement1_1: z.nullable(
    z.array(z.string().refine((value) => value && value !== DEFAULT_VALUE)),
  ),
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
  newSubjects: z.nullable(z.array(z.string().min(1))),
});
