'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormItem as CustomFormItem } from 'client/components';
import { signupFormSchema } from 'client/schemas';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  SelectGroup,
  SelectLabel,
  Button,
  Input,
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from 'shared/components';
import { cn } from 'shared/lib/utils';

const PERMIT_YEAR = 50; // 50년 전까지의 연도만 허용함.

interface SexToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  isSelected: boolean;
}

const SexToggle = ({ children, isSelected, ...props }: SexToggleProps) => {
  const textColor = isSelected ? 'text-blue-600' : 'text-gray-400';
  const borderColor = isSelected ? 'border-blue-600' : 'border-gray-300';

  return (
    <div
      className={cn(
        borderColor,
        'cursor-pointer',
        'w-full',
        'py-2',
        'rounded-lg',
        'border',
        'border-solid',
        'flex',
        'justify-center',
      )}
      {...props}
    >
      <span className={cn(textColor, 'font-normal', 'text-sm')}>{children}</span>
    </div>
  );
};

const phoneNumberRegexp = /^\d{10,11}$/;

const SignUpPage = () => {
  const flexColStyle = ['flex', 'flex-col'] as const;

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [disableCertificationButton, setDisableCertificationButton] = useState<boolean>(true);
  const [disableSubmitButton, setDisableSubmitButton] = useState<boolean>(true);
  const [isSentCertificationNumber, setIsSentCertificationNumber] = useState<boolean>(false);
  const [certificationNumber, setCertificationNumber] = useState<string>('');
  const [isValidCertificationNumber, setIsValidCertificationNumber] = useState<boolean>(false);
  const [isAgreed, setIsAgreed] = useState<boolean>(false);

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: '',
      sex: '',
      phoneNumber: '',
      birth: {
        month: '',
        year: '',
        day: '',
      },
    },
  });

  const { control, setValue, watch } = form;
  const formValues = watch();

  const onSubmit = (data: z.infer<typeof signupFormSchema>) => {};

  const targetYear = new Date().getFullYear() - PERMIT_YEAR;

  const handelPhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    setPhoneNumber(currentValue);

    setDisableCertificationButton(!phoneNumberRegexp.test(currentValue));
  };

  const handleCertificationButtonClick = () => {
    setIsSentCertificationNumber(true);
  };

  const checkCanSubmit = (isValidCertificationNumber: boolean, isAgreed: boolean) => {
    setDisableSubmitButton(!(isValidCertificationNumber && isAgreed));
  };

  const handleCertificationNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    setCertificationNumber(currentValue);

    const isValid = currentValue === '서버에서 보내준 인증번호';
    setIsValidCertificationNumber(isValid);
    checkCanSubmit(isValid, isAgreed);
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.checked;
    setIsAgreed(currentValue);
    checkCanSubmit(isValidCertificationNumber, currentValue);
  };

  return (
    <main className={cn(...flexColStyle, 'items-center', 'gap-10')}>
      <div className={cn(...flexColStyle, 'gap-3', 'items-center')}>
        <h1 className={cn('text-2xl', 'font-semibold')}>회원가입</h1>
        <p className={cn('text-sm', 'font-normal', 'text-gray-600')}>
          가입 이후 <span className={cn('font-semibold')}>정보 수정이 불가</span>하니 정보를 정확히
          입력해 주세요.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={cn(...flexColStyle, 'gap-4')}>
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <CustomFormItem gap="small" text="이름">
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} placeholder="이름 입력" />
                  </FormControl>
                </CustomFormItem>
              </FormItem>
            )}
          />

          <CustomFormItem gap="medium" text="성별">
            <div className={cn('flex', 'gap-2')}>
              <SexToggle
                isSelected={formValues.sex === 'MALE'}
                onClick={() => setValue('sex', 'MALE')}
              >
                남자
              </SexToggle>
              <SexToggle
                isSelected={formValues.sex === 'FEMALE'}
                onClick={() => setValue('sex', 'FEMALE')}
              >
                여자
              </SexToggle>
            </div>
          </CustomFormItem>

          <CustomFormItem gap="small" text="생년월일">
            <div className={cn('flex', 'gap-2')}>
              <FormField
                control={control}
                name="birth"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ? field.value.year : ''}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[121px]">
                          <SelectValue placeholder="년도" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>년도 선택</SelectLabel>
                          {Array.from(
                            { length: PERMIT_YEAR },
                            (_, index) => targetYear + index,
                          ).map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="birth"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ? field.value.month : ''}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[121px]">
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
                )}
              />
              <FormField
                control={control}
                name="birth"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ? field.value.day : ''}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[121px]">
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
                )}
              />
            </div>
          </CustomFormItem>
          <CustomFormItem gap="small" text="전화번호">
            <div className={cn(...flexColStyle, 'gap-1.5')}>
              <div className={cn('flex', 'justify-between')}>
                <div className="w-[288px]">
                  <Input
                    value={phoneNumber}
                    onChange={handelPhoneNumberChange}
                    placeholder="번호 입력"
                  />
                </div>
                <Button
                  type="button"
                  variant="disabled"
                  disabled={disableCertificationButton}
                  onClick={handleCertificationButtonClick}
                >
                  번호 인증
                </Button>
              </div>
              <Input
                disabled={!isSentCertificationNumber}
                value={certificationNumber}
                onChange={handleCertificationNumberChange}
                placeholder="인증번호 6자리 입력"
              />
            </div>
          </CustomFormItem>

          <input type="checkbox" onChange={handleCheck} />

          <Button variant="disabled" disabled={disableSubmitButton}>
            회원가입 완료
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default SignUpPage;
