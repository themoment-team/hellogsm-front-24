'use client';

import { useEffect } from 'react';
import { StepsContainer } from 'shared';
import { GetMyOneseoType } from 'types';

interface RegisterStepsPageProps {
  data: GetMyOneseoType | undefined;
  param: string;
}

const RegisterStepsPage = ({ data, param }: RegisterStepsPageProps) => {
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

  return (
    <>
      <StepsContainer data={data} param={param} />
    </>
  );
};

export default RegisterStepsPage;