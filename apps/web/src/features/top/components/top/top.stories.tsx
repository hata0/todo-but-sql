import { Meta, StoryObj } from "@storybook/react";
import { fn, Mock } from "@storybook/test";
import { faker } from "@faker-js/faker";
import { QueryClient } from "@tanstack/react-query";
import { Top } from "./top";
import { taskMock } from "@/tests/mocks";
import { err, ok, SystemError } from "@/core/result";
import { getQueryKey } from "@/store/list-task";
import { ListTaskDto } from "@/infrastructure/queries/list-task-pglite";
import { generateRandomArray } from "@/utils/array";
import { QueryProviderMock } from "@/components/providers/query-provider";
import { infiniteDelay } from "@/utils/delay";

type Story = StoryObj<typeof Top>;

export const Default: Story = {};

export const Empty: Story = {
  decorators: [
    (Story) => {
      const client = new QueryClient();
      client.setQueryData(getQueryKey(undefined), {
        tasks: [],
      } satisfies ListTaskDto);

      return (
        <QueryProviderMock client={client}>
          <Story />
        </QueryProviderMock>
      );
    },
  ],
};

export const Loading: Story = {
  decorators: [
    (Story) => {
      const client = new QueryClient();
      client.fetchQuery({
        queryKey: getQueryKey(undefined),
        queryFn: infiniteDelay,
      });

      return (
        <QueryProviderMock client={client}>
          <Story />
        </QueryProviderMock>
      );
    },
  ],
};

export const Error: Story = {
  decorators: [
    (Story) => {
      const client = new QueryClient();
      client.fetchQuery({
        queryKey: getQueryKey(undefined),
        queryFn: () => {
          throw new SystemError(faker.lorem.sentence());
        },
      });

      return (
        <QueryProviderMock client={client}>
          <Story />
        </QueryProviderMock>
      );
    },
  ],
};

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
    onResetDatabase: fn(),
    onQueryExecute: fn(),
  },
  decorators: [
    (Story) => {
      const client = new QueryClient();
      client.setQueryData(getQueryKey(undefined), {
        tasks: generateRandomArray(() => taskMock(), { max: 20 }),
      } satisfies ListTaskDto);

      return (
        <QueryProviderMock client={client}>
          <Story />
        </QueryProviderMock>
      );
    },
  ],
  beforeEach: () => {
    (meta.args?.onQueryExecute as Mock).mockResolvedValue(
      ok(faker.lorem.lines(30)),
    );
  },
};
export default meta;
