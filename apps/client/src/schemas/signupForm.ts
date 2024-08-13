import { z } from 'zod';

const nameSchema = z
  .string()
  .min(2, { message: '이름은 최소 2자 이상이어야 합니다.' })
  .max(50, { message: '이름은 최대 50자 이내여야 합니다.' })
  .regex(/^[가-힣a-zA-Z\s]+$/)
  .refine((value) => value, {
    message: '이름을 작성해주세요.',
  });

const sexSchema = z.string().refine((value) => ['MALE', 'FEMALE'].includes(value), {
  message: '성별을 선택해주세요.',
});

const phoneNumberSchema = z
  .string()
  .regex(/^\d{10,11}$/, {
    message: '번호 형식을 확인해 주세요.',
  })
  .refine((value) => value, {
    message: '전화번호를 입력해주세요.',
  });

const birthSchema = z
  .object({
    year: z.string().regex(/^\d{4}$/, { message: '유효한 연도를 선택해주세요.' }),
    month: z.string().regex(/^\d{2}$/, { message: '유효한 월을 선택해주세요.' }),
    day: z.string().regex(/^\d{2}$/, { message: '유효한 일을 선택해주세요.' }),
  })
  .refine((value) => value, {
    message: '유효한 생년월일을 입력해주세요.',
  });

export const signupFormSchema = z.object({
  name: nameSchema.nullable(),
  sex: sexSchema.nullable(),
  phoneNumber: phoneNumberSchema.nullable(),
  birth: birthSchema.nullable(),
});
