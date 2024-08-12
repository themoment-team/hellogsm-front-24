import { Input } from 'shared/components';

import FormItem from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FormItem> = {
  title: 'Client/FormItem',
  component: FormItem,
};

export default meta;

type Story = StoryObj<typeof FormItem>;

export const Primary: Story = {
  args: {
    text: '이름',
    gap: 'small',
    children: <Input placeholder="이름 입력" />,
  },
};

export const Required: Story = {
  args: {
    text: '이름',
    gap: 'small',
    required: true,
    children: <Input placeholder="이름 입력" />,
  },
};
