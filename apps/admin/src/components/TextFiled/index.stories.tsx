import { TextFiled } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TextFiled> = {
  title: 'Admin/TextFiled',
  component: TextFiled,
};

export default meta;

type Story = StoryObj<typeof TextFiled>;

export const Primary: Story = {};
