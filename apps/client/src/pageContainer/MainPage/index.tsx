'use client';

import { useEffect, useState } from 'react';

import { useGetMyAuthInfo } from 'api';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MyMemberInfoType, MyTotalTestResultType } from 'types';

import {
  Footer,
  LoginDialog,
  PassResultDialog,
  Section1,
  Section2,
  Section3,
  Section4,
  Section5,
  TestResultDialog,
} from 'client/components';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from 'shared/components';
import { cn } from 'shared/lib/utils';

interface MainPageProps {
  memberInfo: MyMemberInfoType | undefined;
  resultInfo: MyTotalTestResultType | undefined;
}

const MainPage = ({ memberInfo, resultInfo }: MainPageProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPassOpen, setIsPassOpen] = useState<boolean>(false);
  const [isStage, setIsStage] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState(false);

  const pathname = usePathname();

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
      <AlertDialog open={!isClicked && (!authInfo?.authReferrerType || !memberInfo?.name)}>
        <AlertDialogContent className="w-[400px]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              <strong>로그인을 먼저 진행해주세요</strong>
              <br />
              <br />
              학부모/ 담임교사 합격확인 시, 보안상의 문제로 본인확인을 위해 회원가입 후 학부모/
              담임교사의 본인 로그인이 필요합니다. <br />
              <br /> 빠른 확인을 원하시는 경우, 062-949-6842로 전화주시면 친절히 안내드리겠습니다.{' '}
              <br /> 번거롭게 해드려 죄송합니다.
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <LoginDialog />
            <AlertDialogAction>
              <Link onClick={() => setIsClicked(true)} href="/" scroll={pathname !== '/'}>
                다음에
              </Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Section1 />
      <Section2 />
      <Section3 />
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
