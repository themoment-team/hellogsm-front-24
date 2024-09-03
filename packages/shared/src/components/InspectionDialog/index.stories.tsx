import InspectionDialog from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof InspectionDialog> = {
  title: 'Shared/InspectionDialog',
  component: InspectionDialog,
  args: {
    showModal: true,
  },
};

export default meta;

type Story = StoryObj<typeof InspectionDialog>;

export const Primary: Story = {};
