'use client';

import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { MemberRegisterType, SexType, SendCodeType } from 'types';
import { z } from 'zod';

import { ChevronIcon } from 'client/assets';
import { Footer, SexToggle } from 'client/components';
import { useVerifyCode, usePostMemberRegister, useSendCode } from 'client/hooks';
import { signupFormSchema } from 'client/schemas';

import {
  FormControl,
  CustomFormItem,
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'shared/components';
import { useDebounce } from 'shared/hooks';
import { cn } from 'shared/lib/utils';

const PERMIT_YEAR = 50;

const SignUpPage = () => {
  const { push } = useRouter();

  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [btnClick, setBtnClick] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(180);
  const [lastSubmittedCode, setLastSubmittedCode] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean | undefined>(undefined);

  const [showModal, setShowModal] = useState<'code' | 'success' | ''>('');

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

  useEffect(() => {
    if (btnClick && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [btnClick, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const phoneNumber = formMethods.watch('phoneNumber');
  const certificationNumber = formMethods.watch('certificationNumber');
  const isAgreed = formMethods.watch('isAgreed');
  const isSentCertificationNumber = formMethods.watch('isSentCertificationNumber');
  const sex = formMethods.watch('sex');
  const birthYear = formMethods.watch('birth.year');
  const birthMonth = formMethods.watch('birth.month');
  const birthDay = formMethods.watch('birth.day');

  const isCertificationButtonDisabled = !/^\d{10,11}$/.test(phoneNumber);
  const isCertificationValid = isSuccess === true;
  const isSubmitButtonDisabled = !isCertificationValid || !isAgreed;

  const targetYear = new Date().getFullYear();

  const { mutate: mutateMemberRegister } = usePostMemberRegister({
    onError: () => alert('멘토 등록에 실패하였습니다.'),
    onSuccess: () => {
      setShowModal('success');
    },
  });

  const { mutate: mutateSendCode } = useSendCode({
    onSuccess: () => {
      setBtnClick(true);
      formMethods.setValue('isSentCertificationNumber', true);
    },
    onError: () => setShowModal('code'),
  });

  const { mutate: mutateVerifyCode } = useVerifyCode({
    onSuccess: () => setIsSuccess(true),
    onError: () => setIsSuccess(false),
  });

  const codeDebounce = useDebounce(certificationNumber, 500);

  useEffect(() => {
    if (codeDebounce.length === 6 && codeDebounce !== lastSubmittedCode) {
      const payload = {
        code: codeDebounce,
      };

      mutateVerifyCode(payload);

      setLastSubmittedCode(codeDebounce);
    }
  }, [codeDebounce, lastSubmittedCode, mutateVerifyCode]);

  const onSubmit = (data: z.infer<typeof signupFormSchema>) => {
    const month = String(data.birth.month).padStart(2, '0');
    const day = String(data.birth.day).padStart(2, '0');

    const body: MemberRegisterType = {
      code: data.certificationNumber ?? '',
      name: data.name,
      sex: data.sex as SexType,
      phoneNumber: data.phoneNumber,
      birth: `${data.birth.year}-${month}-${day}`,
    };
    mutateMemberRegister(body);
  };

  const sendCodeNumber = (number: string) => {
    const body: SendCodeType = {
      phoneNumber: number,
    };
    mutateSendCode(body);
  };

  return (
    <>
      <main className={cn('flex', 'flex-col', 'items-center', 'gap-10', 'pb-40', 'pt-[7.5rem]')}>
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
                <div className={cn('flex', 'justify-between', 'items-center')}>
                  <div className={cn('w-[18rem]', btnClick === true ? 'absolute' : '')}>
                    <Input
                      {...formMethods.register('phoneNumber')}
                      placeholder="번호 입력"
                      disabled={isSentCertificationNumber}
                    />
                  </div>
                  {btnClick === true && (
                    <p
                      className={cn(
                        'text-blue-500',
                        'text-[0.875rem]/[1.25rem]',
                        'font-medium',
                        'relative',
                        'left-[15rem]',
                      )}
                    >
                      {formatTime(timeLeft)}
                    </p>
                  )}

                  <Button
                    type="button"
                    variant="disabled"
                    disabled={isCertificationButtonDisabled || btnClick === true}
                    onClick={() => {
                      sendCodeNumber(phoneNumber);
                    }}
                  >
                    번호 인증
                  </Button>
                </div>
                <Input
                  {...formMethods.register('certificationNumber')}
                  // disabled={!isSentCertificationNumber || timeLeft === 0}
                  placeholder="인증번호 6자리 입력"
                  successMessage={isSuccess === true ? '번호 인증이 완료되었습니다' : undefined}
                  errorMessage={isSuccess === false ? '인증번호를 확인해 주세요.' : undefined}
                />
              </div>
            </CustomFormItem>

            <div className={cn('text-gray-900', 'text-sm', 'font-medium')}>
              <div className={cn('flex', 'items-center', 'gap-1', 'justify-between')}>
                <div className={cn('flex', 'items-center', 'gap-2')}>
                  <input type="checkbox" {...formMethods.register('isAgreed')} />
                  [필수] 개인정보 수집 및 이용에 동의합니다.
                </div>
                <button
                  type="button"
                  onClick={() => setShowPrivacyPolicy(!showPrivacyPolicy)}
                  className={cn(
                    'transition-transform duration-300',
                    showPrivacyPolicy ? 'rotate-180' : 'rotate-0',
                  )}
                >
                  <ChevronIcon />
                </button>
              </div>
              {showPrivacyPolicy && (
                <div
                  className={cn(
                    'mt-4',
                    'mb-8',
                    'pt-4',
                    'border-t',
                    'border-solid',
                    'border-gray-200',
                    'text-gray-500',
                    'text-[0.75rem]/[1.125rem]',
                    'font-normal',
                    'h-[8.25rem]',
                    'overflow-scroll',
                  )}
                >
                  1. 개인정보의 수집항목 및 수집방법
                  <br />
                  통계청 나라통계사이트에서는 기본적인 회원 서비스 제공을 위한 필수정보로 실명
                  <br />
                  인증정보와 가입정보로 구분하여 다음의 정보를 수집하고 있습니다. 필수정보를 입
                  <br />
                  력해주셔야 회원 서비스 이용이 가능합니다
                </div>
              )}
            </div>

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

      <AlertDialog open={showModal === 'code'}>
        <AlertDialogContent className="w-[400px]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              인증번호 전송에 실패하였습니다. <br /> (인증번호는 최대 5번만 전송가능합니다.)
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowModal('')}>확인</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showModal === 'success'}>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent className="w-[400px]">
          <AlertDialogHeader>
            <AlertDialogTitle>회원가입에 성공했습니다!</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setShowModal('');
                push('/');
              }}
            >
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SignUpPage;
