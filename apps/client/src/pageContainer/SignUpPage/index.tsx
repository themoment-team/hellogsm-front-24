'use client';

import { useState } from 'react';

import { SexType } from 'types';

import { FormItem } from 'client/components';

import { Input } from 'shared/components';
import { cn } from 'shared/lib/utils';

interface SelectToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  isSelected: boolean;
}

const SelectToggle = ({ children, isSelected, ...props }: SelectToggleProps) => {
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

  return (
    <main className={cn(...flexColStyle, 'items-center', 'gap-10')}>
      <div className={cn(...flexColStyle, 'gap-3', 'items-center')}>
        <h1 className={cn('text-2xl', 'font-semibold')}>회원가입</h1>
        <p className={cn('text-sm', 'font-normal', 'text-gray-600')}>
          가입 이후 <span className={cn('font-semibold')}>정보 수정이 불가</span>하니 정보를 정확히
          입력해 주세요.
        </p>
      </div>

      <div className={cn(...flexColStyle, 'gap-4')}>
        <FormItem gap="small" text="이름">
          <Input placeholder="이름 입력" />
        </FormItem>
        <FormItem gap="medium" text="성별">
          <div className={cn('flex', 'gap-2')}>
            <SelectToggle isSelected={sex === 'MALE'} onClick={() => setSex('MALE')}>
              남자
            </SelectToggle>
            <SelectToggle isSelected={sex === 'FEMALE'} onClick={() => setSex('FEMALE')}>
              여자
            </SelectToggle>
          </div>
        </FormItem>
        <FormItem gap="small" text="생년월일">
          <Input placeholder="생년월일 입력" />
        </FormItem>
        <FormItem gap="small" text="전화번호">
          <Input placeholder="전화번호 입력" />
        </FormItem>
      </div>
    </main>
  );
};

export default SignUpPage;
