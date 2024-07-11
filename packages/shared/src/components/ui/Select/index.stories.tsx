import { Example } from ".";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Example> = {
  title: "Shared/Select",
  component: Example,
};

export default meta;

type Story = StoryObj<typeof Example>;

export const example: Story = {};
