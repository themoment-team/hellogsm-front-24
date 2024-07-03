import { z } from 'zod';

import { scoreFormSchema } from 'client/schemas';

export type ScoreFormType = z.infer<typeof scoreFormSchema>;
