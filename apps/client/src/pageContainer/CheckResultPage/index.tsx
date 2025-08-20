'use client';

import { PassResultDialog } from 'client/components';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from 'shared';

import { cn } from 'shared/lib/utils';
import { MyMemberInfoType, MyTotalTestResultType } from 'types';

const divStyle = [
  'text-gray-900',
  'text-[1rem]/[1.5rem]',
  'font-semibold',
  'w-[12.3125rem]',
  'h-[6.5rem]',
  'bg-white',
  'rounded-xl',
  'p-5',
  'flex',
  'relative',
  'shadow-md',
  'cursor-pointer',
] as const;

const imgStyle = ['absolute', 'top-[2.75rem]', 'right-[1.12rem]'] as const;

const containerStyle = ['flex', 'flex-col', 'gap-10', 'items-center'] as const;

const h1Style = ['text-gray-900', 'text-[1.5rem]/[2rem]', 'font-semibold'] as const;

const prevUrl = '/check-result';

interface CheckResultPageProps {
  memberInfo: MyMemberInfoType | undefined;
  resultInfo: MyTotalTestResultType | undefined;
  isServerHealthy: boolean;
  isCheckFirstResult: boolean;
  isCheckFinalResult: boolean;
}

const CheckResultPage = ({
  memberInfo,
  resultInfo,
  isCheckFirstResult,
  isCheckFinalResult,
}: CheckResultPageProps) => {
  const [isCheckTestFirst, setIsCheckTestFirst] = useState<boolean | null>(null);
  const [isDialog, setIsDialog] = useState(false);

  const [showModal, setShowModal] = useState<'yet' | null>(null);

  const handleCheckTest = (test: boolean) => {
    console.log(test, showModal);
    setIsCheckTestFirst(test);
  };

  const handleDialogClick = () => {
    setIsDialog(false);
  };

  useEffect(() => {
    if (isCheckTestFirst === null) return;

    if (!isCheckFirstResult || !isCheckFinalResult) {
      setShowModal('yet');
    } else {
      setIsDialog(true);
    }
  }, [isCheckTestFirst]);

  return (
    <>
      <div className={cn([containerStyle, 'mt-48'])}>
        <h1 className={cn([h1Style])}>합격 유형을 선택해주세요.</h1>
        <div className={cn('flex', 'gap-5')}>
          <div onClick={() => handleCheckTest(true)} className={cn([divStyle])}>
            1차 합격 조회
            <img src="/images/🍀.png" className={cn([imgStyle, 'w-[3.75rem]', 'h-[3.75rem]'])} />
          </div>
          <div onClick={() => handleCheckTest(false)} className={cn([divStyle])}>
            최종 합격 조회
            <img src="/images/🏆.png" className={cn([imgStyle, 'w-[3.75rem]', 'h-[3.125rem]'])} />
          </div>
        </div>
      </div>

      <AlertDialog open={showModal === 'yet'}>
        <AlertDialogContent className={cn('w-[400px]')}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              현재 {isCheckTestFirst ? '1차 합격' : '최종 합격'} 여부를 조회할 수 없는 기간입니다.
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setShowModal(null), setIsCheckTestFirst(null);
              }}
            >
              <Link href={prevUrl}>확인</Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <PassResultDialog
        isPassOpen={isDialog}
        setIsPassOpen={setIsDialog}
        isFinishFirstTest={false}
        resultInfo={
          isCheckTestFirst
            ? ({
                firstTestPassYn: resultInfo?.firstTestPassYn,
              } as MyTotalTestResultType)
            : resultInfo
        }
        memberInfo={{ name: memberInfo?.name } as MyMemberInfoType}
        onClick={handleDialogClick}
      />
    </>
  );
};

export default CheckResultPage;
