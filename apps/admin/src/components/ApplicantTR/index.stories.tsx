import { ApplicantTR } from 'admin/components';

import { OneseoType } from 'types/oneseo';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Admin/ApplicantTR',
  component: ApplicantTR,
} satisfies Meta<typeof ApplicantTR>;

export default meta;
type Story = StoryObj<typeof meta>;

const MockData: OneseoType = {
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
};

export const Primary: Story = {
  args: MockData,
};
