'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { MemberRegisterType, SexType } from 'types';
import { z } from 'zod';

import { FormItem as CustomFormItem, Footer, SexToggle } from 'client/components';
import { usePostMemberRegister } from 'client/hooks';
import { signupFormSchema } from 'client/schemas';

import {
  FormControl,
  FormItem,
  Button,
  Input,
  Select,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from 'shared/components';
import { cn } from 'shared/lib/utils';

const PERMIT_YEAR = 50;

const SignUpPage = () => {
  const formMethods = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: '',
      sex: '',
      phoneNumber: '',
      certificationNumber: '',
      isSentCertificationNumber: false,
      isAgreed: false,
      birth: {
        year: '',
        month: '',
        day: '',
      },
    },
    mode: 'onChange',
  });

  const phoneNumber = formMethods.watch('phoneNumber');
  const certificationNumber = formMethods.watch('certificationNumber');
  const isAgreed = formMethods.watch('isAgreed');
  const isSentCertificationNumber = formMethods.watch('isSentCertificationNumber');
  const sex = formMethods.watch('sex');
  const birthYear = formMethods.watch('birth.year');
  const birthMonth = formMethods.watch('birth.month');
  const birthDay = formMethods.watch('birth.day');

  const isCertificationButtonDisabled = !/^\d{10,11}$/.test(phoneNumber);
  const isCertificationValid = certificationNumber === '서버에서 보내준 인증번호';
  const isSubmitButtonDisabled = !isCertificationValid || !isAgreed;

  const targetYear = new Date().getFullYear() - PERMIT_YEAR;

  const { mutate: mutateMemberRegister } = usePostMemberRegister({
    onError: () => alert('멘토 등록에 실패하였습니다.'),
    onSuccess: () => '',
  });

  const onSubmit = (data: z.infer<typeof signupFormSchema>) => {
    const body: MemberRegisterType = {
      code: data.certificationNumber ?? '',
      name: data.name,
      sex: data.sex as SexType,
      phoneNumber: data.phoneNumber,
      birth: `${data.birth.year}-${data.birth.month}-${data.birth.day}`,
    };
    mutateMemberRegister(body);

    // TODO 회원가입 처리 로직 작성
    // eslint-disable-next-line no-console
    console.log(data);
  };
  // const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  return (
    <>
      <main className={cn('flex', 'flex-col', 'items-center', 'gap-10', 'pb-40', 'pt-[3.75rem]')}>
        <div className={cn('flex', 'flex-col', 'gap-3', 'items-center')}>
          <h1 className={cn('text-2xl', 'font-semibold')}>회원가입</h1>
          <p className={cn('text-sm', 'font-normal', 'text-gray-600')}>
            가입 이후 <span className={cn('font-semibold')}>정보 수정이 불가</span>하니 정보를
            정확히 입력해 주세요.
          </p>
        </div>

        <FormProvider {...formMethods}>
          <form
            onSubmit={formMethods.handleSubmit(onSubmit)}
            className={cn('flex', 'flex-col', 'gap-4')}
          >
            <FormItem>
              <CustomFormItem className="gap-1" text="이름">
                <FormControl>
                  <Input {...formMethods.register('name')} placeholder="이름 입력" />
                </FormControl>
              </CustomFormItem>
            </FormItem>

            <CustomFormItem className="gap-1.5" text="성별">
              <div className={cn('flex', 'gap-2')}>
                <SexToggle
                  isSelected={sex === 'MALE'}
                  onClick={() => formMethods.setValue('sex', 'MALE')}
                >
                  남자
                </SexToggle>
                <SexToggle
                  isSelected={sex === 'FEMALE'}
                  onClick={() => formMethods.setValue('sex', 'FEMALE')}
                >
                  여자
                </SexToggle>
              </div>
            </CustomFormItem>

            <CustomFormItem className="gap-1" text="생년월일">
              <div className={cn('flex', 'gap-2')}>
                <FormItem>
                  <Select
                    onValueChange={(value) => formMethods.setValue('birth.year', value)}
                    defaultValue={birthYear ?? ''}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[7.5625rem]">
                        <SelectValue placeholder="년도" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>년도 선택</SelectLabel>
                        {Array.from({ length: PERMIT_YEAR }, (_, index) => targetYear - index).map(
                          (year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ),
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
                <FormItem>
                  <Select
                    onValueChange={(value) => formMethods.setValue('birth.month', value)}
                    defaultValue={birthMonth ?? ''}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[7.5625rem]">
                        <SelectValue placeholder="월" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>월 선택</SelectLabel>
                        {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
                          <SelectItem key={month} value={month.toString()}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
                <FormItem>
                  <Select
                    onValueChange={(value) => formMethods.setValue('birth.day', value)}
                    defaultValue={birthDay ?? ''}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[7.5625rem]">
                        <SelectValue placeholder="일" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>일 선택</SelectLabel>
                        {Array.from({ length: 31 }, (_, index) => index + 1).map((day) => (
                          <SelectItem key={day} value={day.toString()}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              </div>
            </CustomFormItem>

            <CustomFormItem className="gap-1" text="전화번호">
              <div className={cn('flex', 'flex-col', 'gap-1.5')}>
                <div className={cn('flex', 'justify-between')}>
                  <div className="w-[18rem]">
                    <Input {...formMethods.register('phoneNumber')} placeholder="번호 입력" />
                  </div>
                  <Button
                    type="button"
                    variant="disabled"
                    disabled={isCertificationButtonDisabled}
                    onClick={() => formMethods.setValue('isSentCertificationNumber', true)}
                  >
                    번호 인증
                  </Button>
                </div>
                <Input
                  {...formMethods.register('certificationNumber')}
                  disabled={!isSentCertificationNumber}
                  placeholder="인증번호 6자리 입력"
                />
              </div>
            </CustomFormItem>

            <input type="checkbox" {...formMethods.register('isAgreed')} />

            <Button
              type="submit"
              variant="disabled"
              disabled={isSubmitButtonDisabled || formMethods.formState.isSubmitting}
            >
              회원가입 완료
            </Button>
          </form>
        </FormProvider>
      </main>

      <Footer />
    </>
  );
};

export default SignUpPage;
