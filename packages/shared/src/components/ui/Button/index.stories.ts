import { Button } from ".";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "Shared/Button",
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    variant: "default",
    children: "Test",
  },
};

export const Fill: Story = {
  args: {
    variant: "fill",
    children: "Continue",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
};

export const Subtitle: Story = {
  args: {
    variant: "subtitle",
    children: "Subtitle",
  },
};

export const Small: Story = {
  args: {
    variant: "default",
    children: "Small",
    size: "sm",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost",
  },
};