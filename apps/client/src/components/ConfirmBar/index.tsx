'use client';

import { Button } from 'shared';

import { MouseIcon } from 'client/assets';

import { cn } from 'shared/lib/utils';

const ConfirmBar = () => {
  const SubmitButton = () => {
    return (
      <button
        className={cn(
          'inline-flex',
          'items-center',
          'justify-center',
          'rounded-md',
          'px-4',
          'py-2',
          'gap-[0.5rem]',
          'bg-[#F1F5F9]',
          'h-10',
        )}
      >
        <div className={cn('w-[1rem]', 'h-[1rem]')}>
          <MouseIcon />
        </div>
        <p className={cn('text-sm', 'font-medium', 'text-[#94A3B8]')}>원서 최종</p>
      </button>
    );
  };

  return (
    <div
      className={cn(
        'w-full',
        'h-[5rem]',
        'bg-white',
        'border-t-solid',
        'border-t-2',
        'px-[20rem]',
        'flex',
        'justify-between',
        'items-center',
      )}
    >
      <div>
        <span className={cn('text-body1', 'text-[#2563EB]')}>
          📎 최종 제출 후에는 정보를 수정할 수 없습니다. &nbsp;
        </span>
        <span className={cn('text-body1', 'text-[#0F172A]')}>정확히 입력 후 제출해주세요!</span>
      </div>

      <div className={cn('flex', 'items-center', 'gap-[0.5rem]')}>
        <Button variant="outline">임시저장</Button>
        <SubmitButton />
      </div>
    </div>
  );
};

export default ConfirmBar;
