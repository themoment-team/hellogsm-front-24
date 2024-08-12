'use client';

import { useState } from 'react';

import { SideMenu, FilterBar, ApplicantTH, ApplicantTR } from 'admin/components';

import { PaginationExample } from 'shared/components';
import { cn } from 'shared/lib/utils';

const PER_PAGE = 10;

const MockApplicationList = Array.from({ length: 50 }, (_, index) => {
  return {
    applicantId: '0189' + index,
    applicantName: '신희성',
    graduation: 'CANDIDATE',
    applicantPhoneNumber: '010 1234 5678',
    guardianPhoneNumber: '010 1234 5678',
    teacherName: '김선생',
    teacherPhoneNumber: '010 1234 5678',
    isFinalSubmitted: false,
    isPrintsArrived: false,
    firstEvaluation: '미정',
    secondEvaluation: '미정',
    screeningFirstEvaluationAt: 'GENERAL',
    screeningSecondEvaluationAt: 'GENERAL',
    registrationNumber: 100,
    secondScore: 100.0,
    interviewScore: 100.0,
  };
});

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
            {MockApplicationList.slice(0, PER_PAGE).map((application) => (
              <ApplicantTR key={application.applicantId} />
            ))}
          </div>
          <PaginationExample />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
