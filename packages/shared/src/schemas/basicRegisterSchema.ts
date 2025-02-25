import { z } from 'zod';

export const basicRegisterSchema = z
  .object({
    img: z.string().min(1, '이미지를 넣어주세요'),
    address: z.string().min(1, '주소를 입력해주세요'),
    detailAddress: z.string().min(1, '상세주소를 입력해주세요'),
    category: z.string().min(1, '유형을 선택해주세요'),
    schoolName: z.string().min(1, '중학교를 입력해주세요'),
    schoolAddress: z.string().min(1, '중학교위치를 입력해주세요'),
    year: z.string().min(1, '년도를 선택해주세요'),
    month: z.string().min(1, '달을 선택해주세요'),
    screening: z.string().min(1, '전형을 선택해주세요'),
    choice: z.array(z.string()).length(3, '3개의 과를 선택해주세요'),
    guardianName: z.string().min(1, '보호자 이름을 입력해주세요'),
    guardianPhoneNumber: z
      .string()
      .min(1, '휴대폰 번호를 입력해주세요')
      .max(11, { message: '보호자 전화번호를 제대로 입력해주세요.' }),
    relationship: z.string().min(1, '보호자와의 관계를 선택해주세요').optional(),
    otherRelationship: z.string().min(1, '보호자와의 관계를 입력해주세요').optional(),
    schoolTeacherName: z.nullable(z.string().min(1, '선생님의 이름을 입력해주세요')),
    schoolTeacherPhoneNumber: z.nullable(
      z
        .string()
        .min(1, '휴대폰 번호를 입력해주세요')
        .max(11, { message: '선생님 전화번호를 제대로 입력해주세요.' }),
    ),
  })
  .refine((data) => data.relationship || data.otherRelationship, {
    message: '보호자와의 관계를 선택하거나 입력해주세요.',
    path: ['relationship'],
  });
