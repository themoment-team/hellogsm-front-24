import { z } from 'zod';

import { scoreFormSchema } from 'client/schemas';

export type GradesInputMethodType = 'freeSemester' | 'freeGrade';

export type ScoreFormType = z.infer<typeof scoreFormSchema>;
