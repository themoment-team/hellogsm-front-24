import { z } from 'zod';

import { phoneNumberRegex } from 'shared/constants';

export const checkFinalTestResultSchema = z.object({
  phoneNumber: z
    .string()
    .refine((phoneNumber) => phoneNumberRegex.test(phoneNumber), '전화번호 형식에 맞지 않습니다.'),
  code: z.string().length(6, '인증번호 형식에 맞지 않습니다.'),
  examinationNumber: z.string(),
});
