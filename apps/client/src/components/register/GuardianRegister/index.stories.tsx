import GuardianRegister from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof GuardianRegister> = {
  title: 'Client/Register/GuardianRegister',
  component: GuardianRegister,
};

export default meta;

type Story = StoryObj<typeof GuardianRegister>;

export const Primary: Story = {};
