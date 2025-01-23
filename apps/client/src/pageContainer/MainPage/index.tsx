'use client';

import { useEffect, useState } from 'react';

import { useGetMyAuthInfo } from 'api';
import { MyMemberInfoType, MyTotalTestResultType } from 'types';

import {
  Footer,
  LoginNoticeDialog,
  PassResultDialog,
  Section1,
  Section2,
  Section3,
  Section4,
  Section5,
  TestResultDialog,
} from 'client/components';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'shared/components';
import { cn } from 'shared/lib/utils';

interface MainPageProps {
  memberInfo: MyMemberInfoType | undefined;
  resultInfo: MyTotalTestResultType | undefined;
  isServerHealthy: boolean;
}

const MainPage = ({ memberInfo, resultInfo, isServerHealthy }: MainPageProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPassOpen, setIsPassOpen] = useState<boolean>(false);
  const [isStage, setIsStage] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const today = new Date().toDateString();
    const hideDialog = localStorage.getItem('hideTestResultDialog');

    if (hideDialog === today) {
      setIsOpen(false);
    } else if (resultInfo && resultInfo.firstTestPassYn !== null) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_STAGE === 'stage') {
      setIsStage(true);
    }
  }, []);

  const isFinishFirstTest = resultInfo?.secondTestPassYn === null ? true : false;

  const { data: authInfo } = useGetMyAuthInfo();

  return (
    <>
      <LoginNoticeDialog
        isClicked={isClicked}
        setIsClicked={setIsClicked}
        authInfo={authInfo}
        memberInfo={memberInfo}
      />
      <Section1 />
      <Section2 />
      <Section3 isServerHealthy={isServerHealthy} />
      <Section4 />
      <Section5 />
      <Footer />
      <TestResultDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onOpenPassResultDialog={() => setIsPassOpen(true)}
        isFinishFirstTest={isFinishFirstTest}
      />
      <PassResultDialog
        isPassOpen={isPassOpen}
        setIsPassOpen={setIsPassOpen}
        resultInfo={resultInfo}
        isFinishFirstTest={isFinishFirstTest}
        memberInfo={memberInfo}
      />
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
    </>
  );
};

export default MainPage;
