'use client';

import { useEffect, useState } from 'react';

import { MyMemberInfoType, MyTestResultType } from 'types';

import {
  Footer,
  PassResultDialog,
  Section1,
  Section2,
  Section3,
  Section4,
  Section5,
  TestResultDialog,
} from 'client/components';

interface MainPageProps {
  resultInfo: MyTestResultType | undefined;
  memberInfo: MyMemberInfoType | undefined;
}

const MainPage = ({ resultInfo, memberInfo }: MainPageProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPassOpen, setIsPassOpen] = useState<boolean>(false);

  useEffect(() => {
    const today = new Date().toDateString();
    const hideDialog = localStorage.getItem('hideTestResultDialog');

    if (hideDialog === today) {
      setIsOpen(false);
    } else if (resultInfo) {
      setIsOpen(true);
    }
  }, [resultInfo]);

  const isFinishFirstTest = resultInfo?.secondTestPassYn === null ? true : false;

  return (
    <>
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
    </>
  );
};

export default MainPage;
