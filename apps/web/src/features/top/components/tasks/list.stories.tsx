import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { QueryClient } from "@tanstack/react-query";
import { TasksList } from "./list";
import { getQueryKey } from "@/store/get-tasks";
import { GetTasksQueryDto } from "@/infrastructure/queries/get-tasks";
import { generateRandomArray } from "@/utils/array";
import { taskMock } from "@/tests/mocks";
import { QueryProviderMock } from "@/providers/query-provider";

type Story = StoryObj<typeof TasksList>;

export const Default: Story = {};

export const Empty: Story = {
  decorators: [
    (Story) => {
      const client = new QueryClient();
      client.setQueryData(getQueryKey(undefined), {
        tasks: [],
      } satisfies GetTasksQueryDto);

      return (
        <QueryProviderMock client={client}>
          <Story />
        </QueryProviderMock>
      );
    },
  ],
};

const meta: Meta<typeof TasksList> = {
  title: "Features/top/TasksList",
  component: TasksList,
  args: {
    setIsQueryOverlayOpen: fn(),
  },
  decorators: [
    (Story) => {
      const client = new QueryClient();
      client.setQueryData(getQueryKey(undefined), {
        tasks: generateRandomArray(() => taskMock()),
      } satisfies GetTasksQueryDto);

      return (
        <QueryProviderMock client={client}>
          <Story />
        </QueryProviderMock>
      );
    },
  ],
};
export default meta;
