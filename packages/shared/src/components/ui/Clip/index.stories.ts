import { Clip } from ".";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Clip> = {
  title: "Shared/Clip",
  component: Clip,
};

export default meta;

type Story = StoryObj<typeof Clip>;

export const 미정: Story = {
  args: {
    variant: "미정",
    children: "미정",
  },
};

export const 합격: Story = {
  args: {
    variant: "합격",
    children: "합격",
  },
};

export const 불합격: Story = {
  args: {
    variant: "불합격",
    children: "불합격",
  },
};
