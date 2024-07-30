import { LoginButton } from ".";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof LoginButton> = {
  title: "Shared/LoginButton",
  component: LoginButton,
};

export default meta;

type Story = StoryObj<typeof LoginButton>;

export const Primary: Story = {};
