'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SexType } from 'types';
import { z } from 'zod';

import { FormItem } from 'client/components';

import {
  Input,
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
  SelectLabel,
  SelectGroup,
} from 'shared/components';
import { cn } from 'shared/lib/utils';

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

  const FormSchema = z.object({
    email: z
      .string({
        required_error: 'Please select an email to display.',
      })
      .email(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <main className={cn(...flexColStyle, 'items-center', 'gap-10')}>
      <div className={cn(...flexColStyle, 'gap-3', 'items-center')}>
        <h1 className={cn('text-2xl', 'font-semibold')}>회원가입</h1>
        <p className={cn('text-sm', 'font-normal', 'text-gray-600')}>
          가입 이후 <span className={cn('font-semibold')}>정보 수정이 불가</span>하니 정보를 정확히
          입력해 주세요.
        </p>
      </div>

      <form className={cn(...flexColStyle, 'gap-4')}>
        <FormItem gap="small" text="이름">
          <Input placeholder="이름 입력" />
        </FormItem>
        <FormItem gap="medium" text="성별">
          <div className={cn('flex', 'gap-2')}>
            <SexToggle isSelected={sex === 'MALE'} onClick={() => setSex('MALE')}>
              남자
            </SexToggle>
            <SexToggle isSelected={sex === 'FEMALE'} onClick={() => setSex('FEMALE')}>
              여자
            </SexToggle>
          </div>
        </FormItem>
        <FormItem gap="small" text="생년월일">
          <div className={cn('flex', 'gap-2')}>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="전형 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>월 선택</SelectLabel>
                  {}
                  <SelectItem value="일반전형">일반전형</SelectItem>
                  <SelectItem value="특별전형">특별전형</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="전형 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>월 선택</SelectLabel>
                  {}
                  <SelectItem value="일반전형">일반전형</SelectItem>
                  <SelectItem value="특별전형">특별전형</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="전형 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>월 선택</SelectLabel>
                  {}
                  <SelectItem value="일반전형">일반전형</SelectItem>
                  <SelectItem value="특별전형">특별전형</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </FormItem>
        <FormItem gap="small" text="전화번호">
          <Input placeholder="전화번호 입력" />
        </FormItem>
      </form>
    </main>
  );
};

export default SignUpPage;
