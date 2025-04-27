import { zodResolver } from "@hookform/resolvers/zod";
import { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { fn } from "@storybook/test";
import { Props, QueryForm, QueryInput, queryInputSchema } from "./query-form";

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

const meta: Meta<typeof Example> = {
  title: "Features/top/QueryForm",
  component: Example,
  args: {
    onQueryExecute: fn(),
  },
};
export default meta;
