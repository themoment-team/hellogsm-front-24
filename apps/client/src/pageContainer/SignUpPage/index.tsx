'use client';

import React, { useReducer } from 'react';

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
// const phoneNumberRegexp = /^\d{10,11}$/;

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

const initialState = {
  phoneNumber: '',
  isCertificationButtonDisabled: true,
  isSubmitButtonDisabled: true,
  isSentCertificationNumber: false,
  certificationNumber: '',
  isValidCertificationNumber: false,
  isAgreed: false,
};

type State = typeof initialState;

type Action =
  | { type: 'UPDATE_PHONE_NUMBER'; payload: string }
  | { type: 'TOGGLE_CERTIFICATION_BUTTON'; payload: boolean }
  | { type: 'SET_CERTIFICATION_SENT'; payload: boolean }
  | { type: 'UPDATE_CERTIFICATION_NUMBER'; payload: string }
  | { type: 'SET_CERTIFICATION_VALID'; payload: boolean }
  | { type: 'TOGGLE_AGREEMENT'; payload: boolean }
  | { type: 'UPDATE_SUBMIT_BUTTON_STATE'; payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_PHONE_NUMBER':
      return { ...state, phoneNumber: action.payload };
    case 'TOGGLE_CERTIFICATION_BUTTON':
      return { ...state, isCertificationButtonDisabled: action.payload };
    case 'SET_CERTIFICATION_SENT':
      return { ...state, isSentCertificationNumber: action.payload };
    case 'UPDATE_CERTIFICATION_NUMBER':
      return { ...state, certificationNumber: action.payload };
    case 'SET_CERTIFICATION_VALID':
      return { ...state, isValidCertificationNumber: action.payload };
    case 'TOGGLE_AGREEMENT':
      return { ...state, isAgreed: action.payload };
    case 'UPDATE_SUBMIT_BUTTON_STATE':
      return { ...state, isSubmitButtonDisabled: !action.payload };
    default:
      return state;
  }
};

const SignUpPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

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

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    dispatch({ type: 'UPDATE_PHONE_NUMBER', payload: currentValue });

    const isPhoneNumberValid = /^\d{10,11}$/.test(currentValue);
    dispatch({ type: 'TOGGLE_CERTIFICATION_BUTTON', payload: !isPhoneNumberValid });
  };

  const handleCertificationButtonClick = () => {
    dispatch({ type: 'SET_CERTIFICATION_SENT', payload: true });
  };

  const handleCertificationNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    dispatch({ type: 'UPDATE_CERTIFICATION_NUMBER', payload: currentValue });

    const isValid = currentValue === '서버에서 보내준 인증번호';
    dispatch({ type: 'SET_CERTIFICATION_VALID', payload: isValid });
    dispatch({ type: 'UPDATE_SUBMIT_BUTTON_STATE', payload: isValid && state.isAgreed });
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.checked;
    dispatch({ type: 'TOGGLE_AGREEMENT', payload: currentValue });
    dispatch({
      type: 'UPDATE_SUBMIT_BUTTON_STATE',
      payload: state.isValidCertificationNumber && currentValue,
    });
  };

  return (
    <main className={cn('flex', 'flex-col', 'items-center', 'gap-10', 'pb-40', 'pt-[3.75rem]')}>
      <div className={cn('flex', 'flex-col', 'gap-3', 'items-center')}>
        <h1 className={cn('text-2xl', 'font-semibold')}>회원가입</h1>
        <p className={cn('text-sm', 'font-normal', 'text-gray-600')}>
          가입 이후 <span className={cn('font-semibold')}>정보 수정이 불가</span>하니 정보를 정확히
          입력해 주세요.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={cn('flex', 'flex-col', 'gap-4')}>
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <CustomFormItem className="gap-1" text="이름">
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} placeholder="이름 입력" />
                  </FormControl>
                </CustomFormItem>
              </FormItem>
            )}
          />

          <CustomFormItem className="gap-1.5" text="성별">
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

          <CustomFormItem className="gap-1" text="생년월일">
            <div className={cn('flex', 'gap-2')}>
              <FormField
                control={control}
                name="birth"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={(value) => setValue('birth.year', value)}
                      defaultValue={field.value?.year ?? ''}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[7.5625rem]">
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
                      onValueChange={(value) => setValue('birth.month', value)}
                      defaultValue={field.value?.month ?? ''}
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
                )}
              />
              <FormField
                control={control}
                name="birth"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={(value) => setValue('birth.day', value)}
                      defaultValue={field.value?.day ?? ''}
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
                )}
              />
            </div>
          </CustomFormItem>
          <CustomFormItem className="gap-1" text="전화번호">
            <div className={cn('flex', 'flex-col', 'gap-1.5')}>
              <div className={cn('flex', 'justify-between')}>
                <div className="w-[18rem]">
                  <Input
                    value={state.phoneNumber}
                    onChange={handlePhoneNumberChange}
                    placeholder="번호 입력"
                  />
                </div>
                <Button
                  type="button"
                  variant="disabled"
                  disabled={state.isCertificationButtonDisabled}
                  onClick={handleCertificationButtonClick}
                >
                  번호 인증
                </Button>
              </div>
              <Input
                disabled={!state.isSentCertificationNumber}
                value={state.certificationNumber}
                onChange={handleCertificationNumberChange}
                placeholder="인증번호 6자리 입력"
              />
            </div>
          </CustomFormItem>

          <input type="checkbox" onChange={handleCheck} />

          <Button type="submit" variant="disabled" disabled={state.isSubmitButtonDisabled}>
            회원가입 완료
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default SignUpPage;
