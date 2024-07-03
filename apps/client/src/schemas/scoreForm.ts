import { z } from 'zod';

export const scoreFormSchema = z.object({
  score1_1: z.array(z.string().refine((value) => value !== '선택')),
  score1_2: z.array(z.string().refine((value) => value !== '선택')),
  score2_1: z.array(z.string().refine((value) => value !== '선택')),
  score2_2: z.array(z.string().refine((value) => value !== '선택')),
  score3_1: z.array(z.string().refine((value) => value !== '선택')),
  score3_2: z.array(z.string().refine((value) => value !== '선택')).optional(),
});
