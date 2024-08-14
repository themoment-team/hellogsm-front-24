import BasicRegister from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof BasicRegister> = {
  title: 'Client/BasicRegister',
  component: BasicRegister,
};

export default meta;

type Story = StoryObj<typeof BasicRegister>;

export const Primary: Story = {};
