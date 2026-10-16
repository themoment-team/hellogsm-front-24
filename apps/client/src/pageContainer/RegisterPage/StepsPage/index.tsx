'use client';

import { useEffect } from 'react';

import { useGetMyMemberInfo } from '@repo/api/hooks';
import { GetMyOneseoType, MyMemberInfoType, StepEnum } from '@repo/types';
import { ComputerRecommendedPage, StepWrapper } from '@repo/ui/components';

interface RegisterStepsPageProps {
  data: GetMyOneseoType | undefined;
  info: MyMemberInfoType;
  step: StepEnum;
  isModifyApproved: boolean;
}

const RegisterStepsPage = ({ data, step, info, isModifyApproved }: RegisterStepsPageProps) => {
  // info prop은 SSR 시점 값이라, 뒤로가기 등으로 라우터 캐시의 이전 페이지가 복원되면
  // 인적사항 수정 전 값으로 폼이 다시 채워진다. 인적사항 PATCH 성공 시 무효화되는
  // react-query 캐시를 우선하고, 캐시가 없을 때만 SSR 값을 초기값으로 쓴다.
  const { data: memberInfo } = useGetMyMemberInfo(info);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
      return '변경사항이 저장되지 않을 수 있습니다. 사이트에서 나가시겠습니까?';
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <ComputerRecommendedPage type="register" />
      <StepWrapper
        data={data}
        info={memberInfo ?? info}
        step={step}
        type="client"
        isModifyApproved={isModifyApproved}
      />
    </>
  );
};

export default RegisterStepsPage;
