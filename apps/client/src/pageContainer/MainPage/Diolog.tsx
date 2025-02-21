import { useState } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'shared/components';
import { cn } from 'shared/lib/utils';

const Test = () => {
  const [isStage, setIsStage] = useState<boolean>(false);

  return {
    component: (
      <Dialog open={isStage}>
        <DialogTitle />
        <DialogContent className="w-[400px]" onClose={() => setIsStage(false)}>
          <DialogHeader>
            <DialogTitle className={cn('flex', 'flex-col', 'text-center', 'gap-4', 'items-center')}>
              <span>현재 접속하신 주소는 개발환경입니다.</span>
              <span>아래 링크로 접속하여 원서를 작성해주세요.</span>
              <a
                href="https://www.hellogsm.kr"
                className={cn('text-blue-500', 'underline', 'w-fit')}
                rel="noreferrer"
              >
                www.hellogsm.kr
              </a>
            </DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    ),
    setIsStage,
  };
};

export default Test;
