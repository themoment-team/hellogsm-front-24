import { PropsWithChildren } from 'react';

import { Input } from 'shared/components';
import { cn } from 'shared/lib/utils';

const flexColStyle = ['flex', 'flex-col'] as const;

interface ItemBoxProps extends PropsWithChildren {
  title: string;
  gap: 'medium' | 'small';
}

const ItemBox = ({ children, title, gap }: ItemBoxProps) => (
  <div className={cn(...flexColStyle, 'w-[380px]', gap === 'small' ? 'gap-1' : 'gap-1.5')}>
    <span className={cn('text-gray-900', 'text-sm', 'font-medium')}>{title}</span>

    {children}
  </div>
);

const SignUpPage = () => {
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
        <ItemBox gap="small" title="이름">
          <Input placeholder="이름 입력" />
        </ItemBox>
      </div>
    </main>
  );
};

export default SignUpPage;
