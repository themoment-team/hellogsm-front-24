'use client';

import { useRouter } from 'next/navigation';

import { EditCheckIcon } from 'shared/assets';
import { Button } from 'shared/index';
import { cn } from 'shared/lib/utils';

interface EditBarProps {
  id: string;
  step: string;
  isFinalButtonClick: boolean;
}

const EditBar = ({ id, step, isFinalButtonClick }: EditBarProps) => {
  const { push } = useRouter();

  return (
    <div
      className={cn([
        'w-full',
        'h-20',
        'flex',
        'justify-end',
        'px-80',
        'bg-white',
        'fixed',
        'bottom-0',
        'items-center',
        'border-t-[0.0625rem]',
        'border-gray-100',
        'gap-2',
      ])}
    >
      <Button variant="outline" onClick={() => push('/')}>
        홈으로
      </Button>
      {step === '4' && (
        <button
          disabled={isFinalButtonClick}
          className={cn([
            'px-4',
            'py-2',
            'flex',
            'gap-2',
            'text-sm',
            'font-normal',
            'font-semibold',
            'leading-3',
            'bg-blue-600',
            'text-white',
            'rounded-md',
            'items-center',
            'h-10',
          ])}
          type="submit"
          form={id}
        >
          <EditCheckIcon />
          원서 수정 완료
        </button>
      )}
    </div>
  );
};

export default EditBar;
