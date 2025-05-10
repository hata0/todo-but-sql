import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { QueryClient } from "@tanstack/react-query";
import { faker } from "@faker-js/faker";
import { QueryOverlay, QueryOverlayProps } from "../query-overlay";
import { Props, TasksList } from "./list";
import { getQueryKey } from "@/store/list-task";
import { ListTaskDto } from "@/infrastructure/queries/list-task-pglite";
import { generateRandomArray } from "@/utils/array";
import { taskMock } from "@/tests/mocks";
import { QueryProviderMock } from "@/components/providers/query-provider";
import { SystemError } from "@/core/result";
import { infiniteDelay } from "@/utils/delay";

const Example = ({
  onQueryExecute,
  onResetDatabase,
}: QueryOverlayProps & Props) => {
  return (
    <QueryOverlay onQueryExecute={onQueryExecute}>
      <TasksList onResetDatabase={onResetDatabase} />
    </QueryOverlay>
  );
};

type Story = StoryObj<typeof Example>;

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

const meta: Meta<typeof Example> = {
  title: "Features/top/TasksList",
  component: Example,
  args: {
    onQueryExecute: fn(),
    onResetDatabase: fn(),
  },
  decorators: [
    (Story) => {
      const client = new QueryClient();
      client.setQueryData(getQueryKey(undefined), {
        tasks: generateRandomArray(() => taskMock()),
      } satisfies ListTaskDto);

      return (
        <QueryProviderMock client={client}>
          <Story />
        </QueryProviderMock>
      );
    },
  ],
};
export default meta;
