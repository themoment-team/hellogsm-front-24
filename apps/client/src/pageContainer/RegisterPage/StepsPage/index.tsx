'use client';

import { useEffect } from 'react';

import { StepsContainer, useStore } from 'shared';
import { GetMyOneseoType, MyMemberInfoType } from 'types';

import { ComputerRecommendedPage } from 'client/pageContainer';

interface RegisterStepsPageProps {
  data: GetMyOneseoType | undefined;
  info: MyMemberInfoType;
  param: string;
}

const RegisterStepsPage = ({ data, param, info }: RegisterStepsPageProps) => {
  const { setAll } = useStore();

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
      return '작성하던 내용이 모두 사라집니다. 계속하시겠습니까?';
    };

    if (window !== undefined) window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    return () => {
      setAll();
    };
  }, []);

  return (
    <>
      <ComputerRecommendedPage />
      <StepsContainer data={data} info={info} param={param} type="client" />;
    </>
  );
};

export default RegisterStepsPage;
