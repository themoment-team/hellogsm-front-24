'use client';

import { FormItem } from 'client/components';

import { Input } from 'shared/components';
import { cn } from 'shared/lib/utils';

const SignUpPage = () => {
  const flexColStyle = ['flex', 'flex-col'] as const;

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
        <FormItem gap="small" text="성별">
          <Input placeholder="성별 입력" />
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
