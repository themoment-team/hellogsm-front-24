'use client';

import { useEffect, useState } from 'react';

import { MyTestResultType } from 'types';

import { Footer, PassResultDialog, Section5, TestResultDialog } from 'client/components';
import { Section1, Section2, Section3, Section4 } from 'client/components';

interface MainPageProps {
  resultInfo: MyTestResultType | undefined;
}

const MainPage = ({ resultInfo }: MainPageProps) => {
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
      />
    </>
  );
};

export default MainPage;
