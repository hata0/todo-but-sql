import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { QueryClient } from "@tanstack/react-query";
import { faker } from "@faker-js/faker";
import { Tasks } from "./tasks";
import { getQueryKey } from "@/store/get-tasks";
import { QueryProviderMock } from "@/providers/query-provider";
import { infiniteDelay } from "@/utils/delay";
import { SystemError } from "@/core/result";

type Story = StoryObj<typeof Tasks>;

export const Loading: Story = {};

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

const meta: Meta<typeof Tasks> = {
  title: "Features/top/Tasks",
  component: Tasks,
  args: {
    onResetDatabase: fn(),
    setIsQueryOverlayOpen: fn(),
  },
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
export default meta;
