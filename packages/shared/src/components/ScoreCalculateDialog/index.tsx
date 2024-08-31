'use client';

import { MockScoreType } from 'types';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogTitle,
} from 'shared/components';
import { cn } from 'shared/lib/utils';

interface ScoreCalculateDialogProps {
  isDialog: boolean;
  setIsDialog: React.Dispatch<React.SetStateAction<boolean>>;
  scoreCalculateDialogData: MockScoreType | null; // todo 타입 변경될수도 있음
  type: 'score' | 'mock';
}

const SUBJECT = '교과';
const TOTAL = '총합';

const ScoreCalculateDialog = ({
  isDialog,
  setIsDialog,
  scoreCalculateDialogData,
  type,
}: ScoreCalculateDialogProps) => {
  const scoreArray = [
    { title: '교과', score: scoreCalculateDialogData?.generalSubjectsScore },
    { title: '출석', score: scoreCalculateDialogData?.attendanceScore },
    { title: '봉사', score: scoreCalculateDialogData?.volunteerScore },
    { title: '총합', score: scoreCalculateDialogData?.totalScore },
    // todo
  ] as const;

  return (
    <AlertDialog open={isDialog}>
      <AlertDialogContent className={cn('w-[32.5rem]', 'max-w-[32.5rem]', 'bg-white')}>
        <AlertDialogHeader>
          <AlertDialogTitle>성적 계산이 완료되었습니다!</AlertDialogTitle>
          <AlertDialogDescription>
            {type === 'score'
              ? '입력하신 모든 정보가 맞다면 성적 확인 후 최종 제출해주세요.'
              : '모의 성적을 확인하셨다면 원서를 작성해 주세요.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className={cn('flex', 'w-[29.5rem]')}>
          {scoreArray.map(({ title, score }) => (
            <div
              key={title}
              className={cn(
                'flex',
                'flex-col',
                'border-zinc-200',
                'border-y-[0.0625rem]',
                title === SUBJECT && ['border-l-[0.0625rem]', 'rounded-l-md'],
                title === TOTAL && ['border-r-[0.0625rem]', 'rounded-r-md'],
              )}
            >
              <h1
                className={cn(
                  'w-[7.375rem]',
                  'h-[3rem]',
                  'flex',
                  'justify-center',
                  'items-center',
                  'border-b-[0.0625rem]',
                  'border-zinc-200',
                  'text-zinc-500',
                  'text-[0.875rem]/[1.5rem]',
                  'font-semibold',
                  'bg-zinc-50',
                  title === SUBJECT && 'rounded-tl-md',
                  title === TOTAL && 'rounded-tr-md',
                )}
              >
                {title}
              </h1>
              <p
                className={cn(
                  'w-[7.375rem]',
                  'h-[3.5rem]',
                  'flex',
                  'justify-center',
                  'items-center',
                  'text-[0.875rem]/[1.25rem]',
                  title === SUBJECT
                    ? ['font-semibold', 'text-blue-600', 'rounded-tr-md']
                    : ['font-normal', 'text-slate-700'],
                  title === TOTAL && 'rounded-tl-md',
                )}
              >
                {score}
              </p>
            </div>
          ))}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => setIsDialog(false)}>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ScoreCalculateDialog;
