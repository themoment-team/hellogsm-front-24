import type { Meta, StoryObj } from "@storybook/react";

import StoryTest from ".";

const meta = {
  title: "Admin/StoryTest",
  component: StoryTest,
} satisfies Meta<typeof StoryTest>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
