import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from ".";

const Example = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
};

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Example> = {
  title: "Shared/Select",
  component: Example,
};

export default meta;

type Story = StoryObj<typeof Example>;

export const example: Story = {};
