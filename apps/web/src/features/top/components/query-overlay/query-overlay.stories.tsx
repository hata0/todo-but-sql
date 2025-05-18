import { Meta, StoryObj } from "@storybook/react";
import { fn, Mock } from "@storybook/test";
import { faker } from "@faker-js/faker";
import { QueryOverlay } from "./query-overlay";
import { ok } from "@/core/result";

type Story = StoryObj<typeof QueryOverlay>;

export const Default: Story = {};

const meta: Meta<typeof QueryOverlay> = {
  title: "Features/top/QueryOverlay",
  component: QueryOverlay,
  args: {
    isOpen: true,
    onOpenChange: fn(),
    onQueryExecute: fn(),
  },
  beforeEach: () => {
    (meta.args?.onQueryExecute as Mock).mockResolvedValue(
      ok(faker.lorem.lines(30)),
    );
  },
};
export default meta;
