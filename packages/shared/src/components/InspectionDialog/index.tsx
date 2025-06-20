import { InspectionIcon } from 'shared/assets';
import { cn } from 'shared/lib/utils';

import { AlertDialog, AlertDialogContent } from '..';

interface InspectionProps {
  showModal: boolean;
}

const InspectionDialog = ({ showModal }: InspectionProps) => {
  return (
    <AlertDialog open={showModal}>
      <AlertDialogContent className={cn('w-[400px]', 'rounded-[1.125rem]', 'gap-6')}>
        <div className={cn('flex', 'justify-center', 'items-center')}>
          <InspectionIcon />
        </div>
        <div className={cn('flex', 'flex-col', 'items-center', 'gap-3')}>
          <p className={cn('text-gray-900', 'text-[1.5rem]/[2rem]', 'font-semibold')}>
            서비스 점검 중
          </p>
          <p
            className={cn([
              'text-gray-500',
              'text-[1.25rem]/[1.75rem]',
              'font-normal',
              'text-center',
            ])}
          >
            현재 문자인증 오류로 잠시 시스템 점검 중입니다.
          </p>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default InspectionDialog;
