import { z } from 'zod';

export const basicRegisterSchema = z.object({
  img: z.string().min(1, '이미지를 넣어주세요'),
  address: z.string().min(1, '주소를 입력해주세요'),
  detailAddress: z.string().min(1, '상세주소를 입력해주세요'),
  phoneNumber: z
    .string()
    .min(1, '휴대폰 번호를 입력해주세요')
    .max(11, { message: '전화번호를 제대로 입력해주세요.' }),
  category: z.string().min(1, '유형을 선택해주세요'),
  middleSchool: z.string().min(1, '중학교를 입력해주세요'),
  year: z.string().min(1, '년도를 선택해주세요'),
  month: z.string().min(1, '달을 선택해주세요'),
  screening: z.string().min(1, '전형을 선택해주세요'),
  choice: z.array(z.string()).length(3, '3개의 과를 선택해주세요'),
  parentsName: z.string().min(1, '보호자 이름을 입력해주세요'),
  parentsNumber: z
    .string()
    .min(1, '휴대폰 번호를 입력해주세요')
    .max(11, { message: '보호자 전화번호를 제대로 입력해주세요.' }),
  relationship: z.string().min(1, '보호자와의 관계를 선택해주세요'),
  otherRelationship: z.string().min(1, '보호자와의 관계를 입력해주세요').optional(),
  teacherName: z.string().min(1, '선생님의 이름를 선택해주세요'),
  teacherNumber: z
    .string()
    .min(1, '휴대폰 번호를 입력해주세요')
    .max(11, { message: '선생님 전화번호를 제대로 입력해주세요.' }),
});
