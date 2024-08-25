import BasicRegister from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof BasicRegister> = {
  title: 'Shared/Register/BasicRegister',
  component: BasicRegister,
  args: {
    name: '김재균',
    birth: '2007-12-08',
    sex: '남자',
  },
};

export default meta;

type Story = StoryObj<typeof BasicRegister>;

export const Primary: Story = {};
