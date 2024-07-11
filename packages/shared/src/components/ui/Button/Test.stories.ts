import { Button } from ".";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "Shared/Button",
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "default",
    children: "Test",
    size: "default",
  },
};

export const Secondary: Story = {
  args: {
    variant: "destructive",
    children: "Test",
  },
};
