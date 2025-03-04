import { useEffect, useState } from 'react';

import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogTitle } from 'shared';

import { cn } from 'shared/lib/utils';

const DevNoticeDialog = () => {
  const [isStage, setIsStage] = useState<boolean>(false);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_STAGE === 'stage') {
      setIsStage(true);
    }
  }, []);

  return (
    <AlertDialog open={isStage} onOpenChange={setIsStage}>
      <AlertDialogContent className="w-[25rem]">
        <AlertDialogTitle
          className={cn('flex', 'flex-col', 'text-center', 'gap-4', 'items-center')}
        >
          <p>현재 접속하신 주소는 개발환경입니다.</p>
          <p>아래 링크로 접속하여 원서를 작성해주세요.</p>
          <a
            href="https://www.hellogsm.kr"
            className={cn('text-blue-500', 'underline', 'w-fit')}
            rel="noreferrer"
          >
            www.hellogsm.kr
          </a>
        </AlertDialogTitle>
        <AlertDialogAction>확인</AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DevNoticeDialog;
