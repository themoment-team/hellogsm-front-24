'use client';

import { useState } from 'react';

import { OneseoSortBy } from '@repo/types';
import { TableHead, TableRow } from '@repo/ui/shadcn';
import { cn } from '@repo/utils';

import { QuestionMark } from '@/assets';
import type { OneseoListSort } from '@/pageContainer/MainPage/oneseoListQuery';

import { getNextSort } from './getNextSort';

interface HeaderTooltipProps {
  message: string;
}

const HeaderTooltip = ({ message }: HeaderTooltipProps) => {
  const [isOver, setIsOver] = useState<boolean>(false);

  return (
    <div
      onMouseOver={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}
      className={cn('cursor-pointer', 'relative')}
    >
      <QuestionMark />
      {isOver && (
        <div
          className={cn(
            'px-3',
            'py-4',
            'rounded-lg',
            'bg-slate-900',
            'text-xs',
            'font-semibold',
            'fixed',
            'z-[5]',
            'text-white',
          )}
        >
          {message}
        </div>
      )}
    </div>
  );
};

const COLUMNS: { label: string; sortBy: OneseoSortBy; width: string; tooltip?: string }[] = [
  { label: '접수 번호', sortBy: 'SUBMIT_CODE', width: 'w-[100px]' },
  {
    label: '서류 제출 여부',
    sortBy: 'REAL_ONESEO_ARRIVED',
    width: 'w-[130px]',
    tooltip: '지원자가 실물 서류를 제출했다면 클릭하여 상태를 변경해주세요!',
  },
  { label: '지원자 정보', sortBy: 'NAME', width: 'w-[154px]' },
  { label: '출신 중학교', sortBy: 'SCHOOL_NAME', width: 'w-[154px]' },
  { label: '전형', sortBy: 'SCREENING', width: 'w-[152px]' },
  { label: '1차 결과', sortBy: 'FIRST_TEST_PASS', width: 'w-[96px]' },
  { label: '역량검사 점수', sortBy: 'COMPETENCY_SCORE', width: 'w-[153px]' },
  { label: '심층면접 점수', sortBy: 'INTERVIEW_SCORE', width: 'w-[153px]' },
  { label: '2차 결과', sortBy: 'SECOND_TEST_PASS', width: 'w-[96px]' },
  {
    label: '입학 동의서 제출 여부',
    sortBy: 'ENTRANCE_INTENTION',
    width: 'w-[170px]',
    tooltip: '지원자가 입학 동의서 서류를 제출했다면 클릭하여 상태를 변경해주세요!',
  },
];

const SORT_ICON = { ASC: '▲', DESC: '▼' } as const;

interface ApplicantTHProps {
  sort: OneseoListSort | null;
  onSortChange: (sort: OneseoListSort | null) => void;
}

const ApplicantTH = ({ sort, onSortChange }: ApplicantTHProps) => {
  const defaultStyle = cn(
    'h-12',
    'px-4',
    'py-px',
    'text-sm',
    'font-semibold',
    'leading-6',
    'text-zinc-500',
  );

  return (
    <TableRow className={cn('border-0', 'hover:bg-transparent')}>
      {COLUMNS.map(({ label, sortBy, width, tooltip }) => {
        const direction = sort?.sortBy === sortBy ? sort.sortDirection : null;

        return (
          <TableHead
            key={sortBy}
            className={cn([defaultStyle, width])}
            aria-sort={
              direction === 'ASC' ? 'ascending' : direction === 'DESC' ? 'descending' : 'none'
            }
          >
            {/* 툴팁을 보거나 누를 때 정렬되지 않도록 툴팁 아이콘은 정렬 버튼 밖에 둡니다. */}
            <div className={cn('flex', 'gap-1', 'items-center')}>
              <button
                type="button"
                onClick={() => onSortChange(getNextSort(sort, sortBy))}
                className={cn(
                  'flex',
                  'gap-1',
                  'items-center',
                  'text-left',
                  'rounded-sm',
                  'hover:text-zinc-900',
                  'focus-visible:outline-none',
                  'focus-visible:ring-2',
                  'focus-visible:ring-slate-400',
                  direction && 'text-zinc-900',
                )}
              >
                {label}
                <span
                  aria-hidden
                  className={cn('shrink-0', 'text-[10px]', !direction && 'text-zinc-300')}
                >
                  {direction ? SORT_ICON[direction] : '↕'}
                </span>
              </button>
              {tooltip && <HeaderTooltip message={tooltip} />}
            </div>
          </TableHead>
        );
      })}
      <TableHead className={cn([defaultStyle, 'w-[121px]'])} />
      <TableHead className={cn([defaultStyle, 'w-[121px]'])} />
    </TableRow>
  );
};

export default ApplicantTH;
