'use client';

import { useState } from 'react';

import { SideMenu, FilterBar, ApplicantTH, ApplicantTR } from 'admin/components';

import { PaginationExample } from 'shared/components';
import { cn } from 'shared/lib/utils';

import { useGetOneseoList } from 'api/hooks';

import { OneseoListType } from 'types/oneseo';

interface MainPageProps {
  initialData: OneseoListType | undefined;
}

const flexColStyle = ['flex', 'flex-col'] as const;

const PER_PAGE = 10;
const DEFAULT_TEST_RESULT_TAG = 'ALL';

const MainPage = ({ initialData }: MainPageProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const { data } = useGetOneseoList(
    0,
    PER_PAGE,
    DEFAULT_TEST_RESULT_TAG,
    undefined,
    undefined,
    undefined,
    {
      initialData: initialData,
    },
  );

  return (
    <main className={cn(isOpen && 'ml-60', isOpen ? 'px-10' : 'pl-20 pr-10', 'pt-[60px]', 'pb-8')}>
      <SideMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={cn(...flexColStyle, 'gap-8')}>
        <h1 className={cn('text-gray-900', 'text-3xl', 'font-semibold')}>전체 지원자 관리</h1>
        <div className={cn(...flexColStyle, 'gap-5')}>
          <FilterBar />
          <div
            className={cn(
              'border',
              'border-solid',
              'border-zinc-200',
              'w-full',
              'rounded-t-md',
              'overflow-hidden',
            )}
          >
            <ApplicantTH />
            <div className={cn('bg-zinc-200', 'w-full', 'h-[1px]')} />
            {data?.oneseos &&
              data.oneseos.map((oneseo) => <ApplicantTR {...oneseo} key={oneseo.memberId} />)}
          </div>
          <PaginationExample />
        </div>
      </div>
    </main>
  );
};

export default MainPage;
