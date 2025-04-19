import { Meta, StoryObj } from "@storybook/react";
import { fn, Mock } from "@storybook/test";
import { err, ok } from "neverthrow";
import { faker } from "@faker-js/faker";
import { taskMock } from "../../tests/task-mock";
import { Top } from "./top";

type Story = StoryObj<typeof Top>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    tasks: [],
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    tasks: [],
  },
};

export const QueryExecuteError: Story = {
  beforeEach: () => {
    (meta.args?.onQueryExecute as Mock).mockResolvedValue(
      err(faker.lorem.lines(30)),
    );
  },
};

const meta: Meta<typeof Top> = {
  title: "Features/top/Top",
  component: Top,
  args: {
    isLoading: false,
    tasks: Array.from({ length: 10 }).map(() => taskMock()),
    onQueryExecute: fn(),
  },
  beforeEach: () => {
    (meta.args?.onQueryExecute as Mock).mockResolvedValue(
      ok(faker.lorem.lines(30)),
    );
  },
};
export default meta;
