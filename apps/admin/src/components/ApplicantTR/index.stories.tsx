import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

import { ApplicantTR } from 'admin/components';

import { OneseoListType, OneseoType } from 'types/oneseo';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Admin/ApplicantTR',
  component: ApplicantTR,
} satisfies Meta<typeof ApplicantTR>;

export default meta;
type Story = StoryObj<typeof meta>;

interface ApplicationTRProps extends OneseoType {
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<OneseoListType, Error>>;
}

const fakeRefetch: (options?: any) => any = async (options) => {
  return {
    data: undefined as unknown as OneseoListType,
    error: undefined as unknown as Error,
    isLoading: false,
    isError: false,
    status: 'idle',
  };
};

const MockData: ApplicationTRProps = {
  memberId: 0,
  submitCode: '',
  realOneseoArrivedYn: 'YES',
  name: '홍길동',
  screening: 'GENERAL',
  schoolName: '',
  phoneNumber: '010 1234 5678',
  guardianPhoneNumber: '010 1234 5678',
  schoolTeacherPhoneNumber: '010 1234 5678',
  firstTestPassYn: 'YES',
  aptitudeEvaluationScore: 100,
  interviewScore: 100,
  secondTestPassYn: 'YES',
  refetch: fakeRefetch,
  entranceIntentionYn: 'YES',
};

export const Primary: Story = {
  args: MockData,
};
