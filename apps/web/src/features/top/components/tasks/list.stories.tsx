import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TasksList } from "./list";
import { getQueryKey } from "@/store/get-tasks";
import { GetTasksQueryDto } from "@/infrastructure/queries/get-tasks";
import { generateRandomArray } from "@/utils/array";
import { taskMock } from "@/tests/mocks";

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
        <QueryClientProvider client={client}>
          <Story />
        </QueryClientProvider>
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
        <QueryClientProvider client={client}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
};
export default meta;
