'use client';

import { useState } from 'react';

import { SideMenu, FilterBar, ApplicantTH, ApplicantTR } from 'admin/components';

import { PaginationExample } from 'shared/components';
import { cn } from 'shared/lib/utils';

const LoginPage = () => {
  const flexColStyle = ['flex', 'flex-col'] as const;

  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <main className={cn(isOpen && 'ml-60', isOpen ? 'px-10' : 'pl-20 pr-10', 'pt-[60px]', 'pb-8')}>
      <SideMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={cn(...flexColStyle, 'gap-8')}>
        <h1 className={cn('text-gray-900', 'text-3xl', 'font-semibold')}>전체 지원자 관리</h1>
        <div className={cn(...flexColStyle, 'gap-5')}>
          <FilterBar />
          <div
            className={cn(
              'w-full',
              'rounded-t-md',
              'overflow-hidden',
              'border',
              'border-solid',
              'border-zinc-200',
            )}
          >
            <ApplicantTH />
            <ApplicantTR />
            <ApplicantTR />
            <ApplicantTR />
          </div>
          <PaginationExample />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
