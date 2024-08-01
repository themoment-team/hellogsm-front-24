import { ApplicantTR } from 'admin/components';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Admin/ApplicantTR',
  component: ApplicantTR,
} satisfies Meta<typeof ApplicantTR>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
