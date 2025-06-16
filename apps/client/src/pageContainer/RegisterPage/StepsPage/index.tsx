'use client';

import { useEffect } from 'react';

import { StepWrapper } from 'shared';
import { GetMyOneseoType, MyMemberInfoType, StepEnum } from 'types';

import { ComputerRecommendedPage } from 'client/pageContainer';

interface RegisterStepsPageProps {
  data: GetMyOneseoType | undefined;
  info: MyMemberInfoType;
  step: StepEnum;
}

const RegisterStepsPage = ({ data, step, info }: RegisterStepsPageProps) => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
      return '작성하던 내용이 모두 사라집니다. 계속하시겠습니까?';
    };

    if (typeof window !== 'undefined') window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <ComputerRecommendedPage />
      <StepWrapper data={data} info={info} step={step} type="client" />
    </>
  );
};

export default RegisterStepsPage;
