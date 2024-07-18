import { Toggle } from ".";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Toggle> = {
  title: "Shared/Toggle",
  component: Toggle,
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Primary: Story = {
  args: {
    children: "test",
  },
};
