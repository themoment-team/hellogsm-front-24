'use client';

import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { getFinalTestResult } from 'api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  checkFinalTestResultSchema,
  CustomFormItem,
  Input,
} from 'shared';
import { checkFinalTestResultFormType, MyMemberInfoType, MyTotalTestResultType } from 'types';

import { PassResultDialog } from 'client/components';
import { useTestResultAuthCode, useTestResultSendCode, useTimer } from 'client/hooks';

import { phoneNumberRegex } from 'shared/constants';
import { useDebounce } from 'shared/hooks';
import { cn } from 'shared/lib/utils';

const prevUrl = '/check-result';

const timerSeconde = 180;

interface CheckFinalResultProps {
  isCheckFinalResult: boolean;
}

const CheckFinalResultPage = ({ isCheckFinalResult }: CheckFinalResultProps) => {
  const [name, setName] = useState<string>();
  const [resultInfo, setResultInfo] = useState<MyTotalTestResultType>();
  const [isDialog, setIsDialog] = useState<boolean>(false);
  const [isButtonClickable, setIsButtonClickable] = useState<boolean>(false);
  const [isAuthenticationButtonClickable, setIsAuthenticationButtonClickable] =
    useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [isFailRequestDialog, setIsFailRequestDialog] = useState<boolean>(false);
  const { push } = useRouter();

  const { register, watch, handleSubmit } = useForm<checkFinalTestResultFormType>({
    resolver: zodResolver(checkFinalTestResultSchema),
    mode: 'onChange',
  });

  const codeDebounce = useDebounce(watch('code'), 500);

  const { count, startTimer, stopTimer } = useTimer({
    sec: timerSeconde,
    setIsFirst: setIsFirst,
    keepAfterRefresh: false,
  });

  const { mutate: mutateSendCode } = useTestResultSendCode({
    onSuccess: () => {
      startTimer();
    },
    onError: () => {},
  });

  const { mutate: mutateAuthCode } = useTestResultAuthCode({
    onSuccess: () => {
      stopTimer();
      setIsAuthenticated(true);
    },
    onError: () => setIsAuthenticated(false),
  });

  const handleAuthenticationButtonClick = () => {
    mutateSendCode({
      phoneNumber: watch('phoneNumber'),
    });
  };

  const handleFormSubmit = async ({
    phoneNumber,
    code,
    examinationNumber,
  }: checkFinalTestResultFormType) => {
    const data = await getFinalTestResult(phoneNumber, code, examinationNumber);

    if (!data) return setIsFailRequestDialog(true);

    setName(data.name);
    setResultInfo({
      decidedMajor: data.decidedMajor,
      firstTestPassYn: 'YES',
      secondTestPassYn: data.secondTestPassYn,
    });

    setIsDialog(true);
  };

  const handleDialogClick = () => {
    push(prevUrl);
  };

  const secToMinFormat = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    if (!codeDebounce || codeDebounce.length !== 6) return;

    mutateAuthCode({ code: codeDebounce });
  }, [codeDebounce, mutateAuthCode]);

  useEffect(() => {
    if (phoneNumberRegex.test(watch('phoneNumber')) && !count) {
      setIsAuthenticationButtonClickable(true);
    } else {
      setIsAuthenticationButtonClickable(false);
    }
  }, [watch('phoneNumber'), count]);

  useEffect(() => {
    if (checkFinalTestResultSchema.safeParse(watch()).success && isAuthenticated)
      setIsButtonClickable(true);
    else setIsButtonClickable(false);
  }, [watch()]);

  return (
    <>
      <div className={cn('flex', 'flex-col', 'gap-10', 'items-center', 'mt-20')}>
        <h1 className={cn('text-gray-900', 'text-[1.5rem]/[2rem]', 'font-semibold')}>
          최종 합격자 조회
        </h1>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className={cn('flex', 'flex-col', 'items-center', 'gap-4')}
        >
          <CustomFormItem className="gap-1" text="수험번호">
            <Input {...register('examinationNumber')} placeholder="수험번호 입력" />
          </CustomFormItem>
          <CustomFormItem className="gap-1" text="선생님/부모님 전화번호">
            <div className={cn('flex', 'gap-2', 'mb-[0.15rem]')}>
              <div className={cn('w-[18rem]', 'relative')}>
                <Input {...register('phoneNumber')} placeholder="번호 입력(- 제외)" />
                {!!count && (
                  <p
                    className={cn(
                      'text-blue-500',
                      'text-[0.875rem]/[1.25rem]',
                      'font-medium',
                      'absolute',
                      'top-1/2',
                      'right-4',
                      '-translate-y-1/2 transform',
                    )}
                  >
                    {secToMinFormat(count)}
                  </p>
                )}
              </div>
              <Button
                type="button"
                disabled={isAuthenticated ? true : isAuthenticationButtonClickable ? false : true}
                variant={
                  isAuthenticated
                    ? 'disabled'
                    : isAuthenticationButtonClickable
                      ? 'disabled'
                      : 'submit'
                }
                className="w-[5.25rem]"
                onClick={handleAuthenticationButtonClick}
              >
                {isAuthenticated ? '인증됨' : isFirst ? '번호 인증' : '재전송'}
              </Button>
            </div>
            <Input
              {...register('code')}
              placeholder="인증번호 6자리 입력"
              successMessage={isAuthenticated ? '번호 인증이 완료되었습니다' : undefined}
              errorMessage={
                !isAuthenticated && !isFirst && count <= 0
                  ? '번호 인증에 실패하였습니다'
                  : undefined
              }
            />
          </CustomFormItem>
          <div className={cn('flex', 'flex-col', 'gap-6', 'items-center')}>
            <Button
              type="submit"
              disabled={isButtonClickable ? false : true}
              variant={isButtonClickable ? 'blue' : 'disabled'}
              className={cn('w-[23.7rem]', 'h-[3.25rem]', 'text-[1rem]/[1.5rem]')}
            >
              조회하기
            </Button>
            <Link
              href={prevUrl}
              className={cn('text-slate-500', 'text-[0.875rem]/[1.5rem]', 'flex')}
            >
              이전으로
            </Link>
          </div>
        </form>
      </div>

      <AlertDialog open={!isCheckFinalResult}>
        <AlertDialogContent className="w-[400px]">
          <AlertDialogHeader>
            <AlertDialogTitle>현재 최종 합격 여부를 조회할 수 없는 기간입니다.</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>
              <Link href={prevUrl}>확인</Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isFailRequestDialog}>
        <AlertDialogContent className="w-[400px]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              조회된 사람이 없습니다.
              <br />
              수험번호와 전화번호를 확인해주세요.
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>
              <Link href={prevUrl}>확인</Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <PassResultDialog
        isPassOpen={isDialog}
        setIsPassOpen={setIsDialog}
        isFinishFirstTest={false}
        resultInfo={resultInfo}
        memberInfo={{ name: name } as MyMemberInfoType}
        onClick={handleDialogClick}
      />
    </>
  );
};

export default CheckFinalResultPage;
