'use client';

import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
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
  FormControl,
  FormItem,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from 'shared';
import { checkFinalTestResultFormType, MyMemberInfoType, MyTotalTestResultType } from 'types';

import { PassResultDialog } from 'client/components';
import { useGetFinalTestResult } from 'client/hooks/api';

import { cn } from 'shared/lib/utils';
import formattedBirthDate from 'shared/utils/formatBirth';

const prevUrl = '/check-result';

const PERMIT_YEAR = 50;

interface CheckFinalResultProps {
  isCheckFinalResult: boolean;
}

const CheckFinalResultPage = ({ isCheckFinalResult }: CheckFinalResultProps) => {
  const [name, setName] = useState<string>();
  const [resultInfo, setResultInfo] = useState<MyTotalTestResultType>();
  const [isDialog, setIsDialog] = useState<boolean>(false);
  const [isButtonClickable, setIsButtonClickable] = useState<boolean>(false);
  const [isFailRequestDialog, setIsFailRequestDialog] = useState<boolean>(false);
  const [queryParams, setQueryParams] = useState<
    | {
        name: string;
        birth: string;
        phoneNumber: string;
      }
    | undefined
  >(undefined);
  const { push } = useRouter();

  const formMethods = useForm<checkFinalTestResultFormType>({
    resolver: zodResolver(checkFinalTestResultSchema),
    mode: 'onChange',
  });

  const { data, error, isPending } = useGetFinalTestResult(queryParams);

  const targetYear = new Date().getFullYear();

  const birthYear = formMethods.watch('birth.year');
  const birthMonth = formMethods.watch('birth.month');
  const birthDay = formMethods.watch('birth.day');

  const handleFormSubmit = async ({ name, birth, phoneNumber }: checkFinalTestResultFormType) => {
    const formattedBirth = formattedBirthDate(birth);

    setQueryParams({
      name,
      birth: formattedBirth,
      phoneNumber,
    });
  };

  const handleDialogClick = () => {
    push(prevUrl);
  };

  useEffect(() => {
    if (checkFinalTestResultSchema.safeParse(formMethods.watch()).success)
      setIsButtonClickable(true);
    else setIsButtonClickable(false);
  }, [formMethods.watch()]);

  useEffect(() => {
    if (data) {
      setName(data.name);
      setResultInfo({
        decidedMajor: data.decidedMajor,
        firstTestPassYn: 'YES',
        secondTestPassYn: data.secondTestPassYn,
      });
      setIsDialog(true);
    } else if (error || (data === undefined && queryParams)) {
      setIsFailRequestDialog(true);
    }
  }, [data, error, queryParams]);

  return (
    <>
      <div className={cn('flex', 'flex-col', 'gap-10', 'items-center', 'mt-20')}>
        <h1 className={cn('text-gray-900', 'text-[1.5rem]/[2rem]', 'font-semibold')}>
          최종 합격자 조회
        </h1>
        <FormProvider {...formMethods}>
          <form
            onSubmit={formMethods.handleSubmit(handleFormSubmit)}
            className={cn('flex', 'flex-col', 'items-center', 'gap-4')}
          >
            <CustomFormItem className="gap-1" text="수험자 성명">
              <Input {...formMethods.register('name')} placeholder="수험자 성명 입력" />
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
            <CustomFormItem className="gap-1" text="수험자 전화번호">
              <Input
                {...formMethods.register('phoneNumber')}
                placeholder="수험자 전화번호 입력(-제외)"
              />
            </CustomFormItem>
            <div className={cn('flex', 'flex-col', 'gap-6', 'items-center')}>
              <Button
                type="submit"
                disabled={isButtonClickable ? false : true}
                variant={isButtonClickable ? 'blue' : 'disabled'}
                className={cn('w-[23.7rem]', 'h-[3.25rem]', 'text-[1rem]/[1.5rem]')}
              >
                {isPending ? '조회 중...' : '조회하기'}
              </Button>
              <Link
                href={prevUrl}
                className={cn('text-slate-500', 'text-[0.875rem]/[1.5rem]', 'flex')}
              >
                이전으로
              </Link>
            </div>
          </form>
        </FormProvider>
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
