'use client';

import { useEffect, useState } from 'react';

import { Button, Dialog, DialogContent, DialogDescription, DialogTitle } from '@repo/ui/shadcn';
import { cn } from '@repo/utils';

const HIDE_KEY = 'hideSchoolRecordNoticeDialog';

const SchoolRecordNoticeDialog = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const today = new Date().toDateString();
    // localStorage는 클라이언트 전용 값 — hydration 불일치를 막기 위해 마운트 후 반영
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(localStorage.getItem(HIDE_KEY) !== today);
  }, []);

  const buttonStyle = ['flex-1', 'h-[3.25rem]', 'text-[1rem]/[1.5rem]', 'font-semibold'];

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className={cn('w-[calc(100%-2rem)]', 'max-w-[440px]', 'gap-6', 'p-7', '!rounded-[20px]')}
        onClose={() => setIsOpen(false)}
        onEscapeKeyDown={() => setIsOpen(false)}
      >
        <DialogTitle className={cn('pr-8', 'text-[1.25rem]/[1.75rem]', 'font-semibold')}>
          학교생활기록부 제출 시 간인 생략 안내
        </DialogTitle>
        <DialogDescription
          asChild
          className={cn('text-gray-700', 'text-[1rem]/[1.625rem]', 'font-medium')}
        >
          <div className={cn('flex', 'flex-col', 'gap-3', 'break-keep')}>
            <p>
              출신학교 행정실에서 정식 발급받은 학교생활기록부는 마지막 장에 담당자 확인 및 학교장
              직인이 있는 경우, 별도의 간인 없이 본교에 제출할 수 있습니다.
            </p>
            <p>발급받은 서류는 모든 쪽을 빠짐없이 제출해 주시기 바랍니다.</p>
          </div>
        </DialogDescription>
        <div className={cn('flex', 'gap-3')}>
          <Button
            variant="reverseFill"
            className={cn([...buttonStyle])}
            onClick={() => {
              localStorage.setItem(HIDE_KEY, new Date().toDateString());
              setIsOpen(false);
            }}
          >
            오늘 하루 그만보기
          </Button>
          <Button variant="fill" className={cn([...buttonStyle])} onClick={() => setIsOpen(false)}>
            확인
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SchoolRecordNoticeDialog;
