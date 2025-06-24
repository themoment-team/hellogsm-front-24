'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { StepWrapper } from 'shared';
import { GetMyOneseoType, MyMemberInfoType, StepEnum } from 'types';

import { ComputerRecommendedPage } from 'client/pageContainer';

interface RegisterStepsPageProps {
  data: GetMyOneseoType | undefined;
  info: MyMemberInfoType;
  step: StepEnum;
}

const RegisterStepsPage = ({ data, step, info }: RegisterStepsPageProps) => {
  const [isTempSaved, setIsTempSaved] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const warningMessage = '작성하던 내용이 모두 사라집니다. 계속하시겠습니까?';

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isTempSaved) {
        event.preventDefault();
        event.returnValue = '';
        return warningMessage;
      }
    };

    const handlePopState = (event: PopStateEvent) => {
      if (!isTempSaved && !confirm(warningMessage)) {
        history.pushState(null, '', window.location.href);
        return;
      }
      history.back();
    };

    const originalPush = router.push;
    const newPush = (href: string): void => {
      if (!isTempSaved && !confirm(warningMessage)) {
        return;
      }
      originalPush(href);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', handleBeforeUnload);
      window.addEventListener('popstate', handlePopState);
      history.pushState(null, '', window.location.href);
      router.push = newPush;
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
      router.push = originalPush;
    };
  }, [router, isTempSaved]);

  return (
    <>
      <ComputerRecommendedPage />
      <StepWrapper 
        data={data} 
        info={info} 
        step={step} 
        type="client"
        onTempSave={() => setIsTempSaved(true)}
        onFormChange={() => setIsTempSaved(false)}
      />
    </>
  );
};

export default RegisterStepsPage;
