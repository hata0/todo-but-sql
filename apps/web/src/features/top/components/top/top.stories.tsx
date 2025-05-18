import { Meta, StoryObj } from "@storybook/react";
import { fn, Mock } from "@storybook/test";
import { faker } from "@faker-js/faker";
import { Top } from "./top";
import { taskMock } from "@/tests/mocks";
import { err, ok, SystemError } from "@/core/result";
import { generateRandomArray } from "@/utils/array";

type Story = StoryObj<typeof Top>;

export const Default: Story = {};

export const QueryExecuteError: Story = {
  beforeEach: () => {
    (meta.args?.onQueryExecute as Mock).mockResolvedValue(
      err(new SystemError(faker.lorem.lines(30))),
    );
  },
};

const meta: Meta<typeof Top> = {
  title: "Features/top/Top",
  component: Top,
  args: {
    currentTab: null,
    listTask: {
      data: { tasks: generateRandomArray(() => taskMock(), { max: 20 }) },
      error: null,
      isLoading: false,
    },
    onTabChange: fn(),
    onResetDatabase: fn(),
    onQueryExecute: fn(),
  },
  beforeEach: () => {
    (meta.args?.onQueryExecute as Mock).mockResolvedValue(
      ok(faker.lorem.lines(30)),
    );
  },
};
export default meta;
