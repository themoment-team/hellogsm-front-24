import { checkFinalTestResultSchema, checkFirstTestResultSchema } from "shared";

import { z } from "zod";

export type checkFirstTestResultFormType = z.infer<typeof checkFirstTestResultSchema>;

export type checkFinalTestResultFormType = z.infer<typeof checkFinalTestResultSchema>;
