'use client';

import { Button } from 'shared';

import { MouseIcon } from 'client/assets';

import { cn } from 'shared/lib/utils';

const ConfirmBar = () => {
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
        <Button variant="submit">
          <MouseIcon />
          <p>원서 최종</p>
        </Button>
      </div>
    </div>
  );
};

export default ConfirmBar;
