'use client';

import { MouseIcon } from 'shared/assets';
import { Button } from 'shared/components';
import { cn } from 'shared/lib/utils';

interface ConfirmBarProps {
  id: string;
}

const ConfirmBar = ({ id }: ConfirmBarProps) => {
  return (
    <div
      className={cn(
        'w-full',
        'h-[5rem]',
        'bg-white',
        'border-t-solid',
        'border-t-[0.0625rem]',
        'border-gray-100',
        'px-[20rem]',
        'flex',
        'justify-between',
        'items-center',
        'fixed',
        'bottom-0',
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
        <Button variant="submit" type="submit" form={id}>
          <MouseIcon />
          <p>원서 최종</p>
        </Button>
      </div>
    </div>
  );
};

export default ConfirmBar;