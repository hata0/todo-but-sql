import { Meta, StoryObj } from "@storybook/react";
import { fn, Mock } from "@storybook/test";
import { faker } from "@faker-js/faker";
import { taskMock } from "../../tests/task-mock";
import { Top } from "./top";
import { err, ok } from "@/core/result";

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

export const ResetDatabaseSuccess: Story = {
  beforeEach: () => {
    (meta.args?.onResetDatabase as Mock).mockResolvedValue("success");
  },
  args: {
    errorMessage: faker.lorem.sentence(),
  },
};

export const ResetDatabaseError: Story = {
  beforeEach: () => {
    (meta.args?.onResetDatabase as Mock).mockResolvedValue("error");
  },
  args: {
    errorMessage: faker.lorem.sentence(),
  },
};

export const ResetDatabaseBlocked: Story = {
  beforeEach: () => {
    (meta.args?.onResetDatabase as Mock).mockResolvedValue("blocked");
  },
  args: {
    errorMessage: faker.lorem.sentence(),
  },
};

const meta: Meta<typeof Top> = {
  title: "Features/top/Top",
  component: Top,
  args: {
    isLoading: false,
    tasks: Array.from({ length: 10 }).map(() => taskMock()),
    errorMessage: null,
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
