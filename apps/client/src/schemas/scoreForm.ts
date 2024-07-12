import { z } from 'zod';

const DEFAULT_VALUE = '선택';

export const scoreFormSchema = z.object({
  score1_1: z.nullable(z.array(z.string().refine((value) => value !== DEFAULT_VALUE))),
  score1_2: z.nullable(z.array(z.string().refine((value) => value !== DEFAULT_VALUE))),
  score2_1: z.nullable(z.array(z.string().refine((value) => value !== DEFAULT_VALUE))),
  score2_2: z.nullable(z.array(z.string().refine((value) => value !== DEFAULT_VALUE))),
  score3_1: z.nullable(z.array(z.string().refine((value) => value !== DEFAULT_VALUE))),
});
