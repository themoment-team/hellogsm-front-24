'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SexType } from 'types';
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
} from 'shared/components';
import {
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

const SignUpPage = () => {
  const flexColStyle = ['flex', 'flex-col'] as const;

  const [sex, setSex] = useState<SexType | ''>('');

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

  const onSubmit = (data: z.infer<typeof signupFormSchema>) => {};

  const targetYear = new Date().getFullYear() - PERMIT_YEAR;

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
            control={form.control}
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
              <SexToggle isSelected={sex === 'MALE'} onClick={() => setSex('MALE')}>
                남자
              </SexToggle>
              <SexToggle isSelected={sex === 'FEMALE'} onClick={() => setSex('FEMALE')}>
                여자
              </SexToggle>
            </div>
          </CustomFormItem>

          <CustomFormItem gap="small" text="생년월일">
            <div className={cn('flex', 'gap-2')}>
              <FormField
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
            <Input placeholder="전화번호 입력" />
          </CustomFormItem>
        </form>
      </Form>
    </main>
  );
};

export default SignUpPage;
