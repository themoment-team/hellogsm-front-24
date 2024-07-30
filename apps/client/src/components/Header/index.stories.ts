import { Header } from 'client/components';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Header> = {
  title: 'Client/Header',
  component: Header,
  parameters: {},
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Primary: Story = {
  args: {
    isLogin: true,
    name: '사용자',
  },
};
