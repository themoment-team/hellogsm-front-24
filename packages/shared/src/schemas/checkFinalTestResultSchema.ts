import { z } from 'zod';

import { koreanNameRegex, phoneNumberRegex } from 'shared/constants';

import { birthSchema } from './birthSchema';

export const checkFinalTestResultSchema = z.object({
  phoneNumber: z
    .string()
    .refine((phoneNumber) => phoneNumberRegex.test(phoneNumber), '전화번호 형식에 맞지 않습니다.'),
  name: z.string().refine((name) => koreanNameRegex.test(name), {
    message: '이름은 한글 2글자 이상이어야 합니다.',
  }),
  birth: birthSchema,
});
