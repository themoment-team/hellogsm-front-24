import { PaginationExample } from 'shared';

import { SideMenu } from 'admin/components';

import { cn } from 'shared/lib/utils';

const LoginPage = () => {
  const flexColStyle = ['flex', 'flex-col'] as const;

  return (
    <main className={cn('ml-60', 'pw-40', 'pt-[60px]', 'pb-8')}>
      <SideMenu />
      <div className={cn(...flexColStyle, 'gap-8')}>
        <h1 className={cn('text-gray-900', 'text-3xl', 'font-semibold')}>전체 지원자 관리</h1>
        <div className={cn(...flexColStyle, 'gap-5')}>
          <PaginationExample />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
