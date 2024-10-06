import { z } from "zod";

import { scoreFormSchema } from "shared";

export type GradesInputMethodType = "freeSemester" | "freeGrade";

export type ScoreFormType = z.infer<typeof scoreFormSchema>;
