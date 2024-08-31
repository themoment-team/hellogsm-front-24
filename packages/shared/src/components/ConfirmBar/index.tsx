'use client';

import { useSearchParams } from 'next/navigation';

import { MouseIcon } from 'shared/assets';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Button,
  DialogHeader,
} from 'shared/components';
import { cn } from 'shared/lib/utils';

interface ConfirmBarProps {
  id: string;
  temporarySave: () => void;
  isStep4Checkable: boolean;
}

interface FinalSubmitDialogProps {
  id: string;
  isStep4Checkable: boolean;
}

const FinalSubmitDialog = ({ id, isStep4Checkable }: FinalSubmitDialogProps) => {
  const searchParams = useSearchParams();
  const step = Number(searchParams.get('step'));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={step !== 4 || !isStep4Checkable}
          variant={step === 4 && isStep4Checkable ? 'next' : 'submit'}
          className={cn('flex', 'gap-2', 'items-center')}
        >
          <MouseIcon />
          <p>원서 최종 제출</p>
        </Button>
      </DialogTrigger>
      <DialogContent showCloseIcon={false}>
        <DialogHeader>
          <DialogTitle>원서를 최종 제출 하시겠습니까?</DialogTitle>
          <DialogDescription>
            제출 후에는 정보를 수정할 수 없으니, 모든 정보가 맞는지 확인 후 제출해주세요.
          </DialogDescription>
        </DialogHeader>
        <div className={cn('flex', 'justify-end', 'gap-2')}>
          <DialogClose asChild>
            <button
              className={cn(
                'bg-white',
                'px-4',
                'py-2',
                'text-[#0F172A]',
                'rounded-md',
                'border-[0.0625rem]',
                'border-slate-200',
                'font-semibold',
              )}
            >
              취소
            </button>
          </DialogClose>
          <DialogClose asChild>
            <button
              className={cn('px-4', 'py-2', 'rounded-md', 'text-white', 'bg-[#0F172A]')}
              type="submit"
              form={id}
            >
              최종 제출
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ConfirmBar = ({ id, temporarySave, isStep4Checkable }: ConfirmBarProps) => {
  return (
    <>
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
          <span className={cn('text-body1', 'text-blue-600')}>
            📎 최종 제출 후에는 정보를 수정할 수 없습니다. &nbsp;
          </span>
          <span className={cn('text-body1', 'text-slate-900')}>정확히 입력 후 제출해주세요!</span>
        </div>
        <div className={cn('flex', 'items-center', 'gap-[0.5rem]')}>
          <Button onClick={temporarySave} variant="outline">
            임시저장
          </Button>
          <FinalSubmitDialog id={id} isStep4Checkable={isStep4Checkable} />
        </div>
      </div>
    </>
  );
};

export default ConfirmBar;
