import { Example } from ".";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Example> = {
  title: "Shared/AlertDialog",
  component: Example,
};

export default meta;

type Story = StoryObj<typeof Example>;

export const Primary: Story = {};