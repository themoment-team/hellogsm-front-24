import { z } from 'zod';

import { koreanNameRegex, phoneNumberRegex } from 'shared/constants';

import { birthSchema } from './birthSchema';

export const checkFirstTestResultSchema = z.object({
  phoneNumber: z
    .string()
    .refine((phoneNumber) => phoneNumberRegex.test(phoneNumber), '전화번호 형식에 맞지 않습니다.'),
  name: z.string().refine((val) => koreanNameRegex.test(val), {
    message: '이름은 한글 2글자 이상이어야 합니다.',
  }),
  birth: birthSchema,
});
