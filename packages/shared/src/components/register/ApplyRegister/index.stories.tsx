import ApplyRegister from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ApplyRegister> = {
  title: 'Shared/Register/ApplyRegister',
  component: ApplyRegister,
  args: {
    name: '김재균',
    birth: '2007-12-08',
    sex: '남자',
  },
};

export default meta;

type Story = StoryObj<typeof ApplyRegister>;

export const Primary: Story = {};
