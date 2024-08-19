import BasicRegister from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof BasicRegister> = {
  title: 'Client/BasicRegister',
  component: BasicRegister,
  args: {
    name: '김재균',
    birth: '20071208',
    sex: '남자',
  },
};

export default meta;

type Story = StoryObj<typeof BasicRegister>;

export const Primary: Story = {};
