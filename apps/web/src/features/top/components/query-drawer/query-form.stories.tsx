import { zodResolver } from "@hookform/resolvers/zod";
import { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { fn } from "@storybook/test";
import { queryInputSchema } from "../../schema";
import { QueryInput } from "../../types/task";
import { Props, QueryForm } from "./query-form";

const Example = (props: Omit<Props, "form">) => {
  const form = useForm<QueryInput>({
    resolver: zodResolver(queryInputSchema),
    defaultValues: {
      query: "",
    },
  });

  return <QueryForm form={form} {...props} />;
};

type Story = StoryObj<typeof Example>;

export const Default: Story = {};

export default {
  title: "Features/top/QueryForm",
  component: Example,
  args: {
    onQueryExecute: fn(),
  },
} satisfies Meta<typeof Example>;
