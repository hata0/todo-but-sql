import { zodResolver } from "@hookform/resolvers/zod";
import { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { fn, Mock } from "@storybook/test";
import { faker } from "@faker-js/faker";
import {
  QueryFormProps,
  QueryForm,
  QueryInput,
  queryInputSchema,
} from "./query-form";
import { err, ok, SystemError } from "@/core/result";

const Example = (props: Omit<QueryFormProps, "form">) => {
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

export const Error: Story = {
  beforeEach: () => {
    (meta.args?.onQueryExecute as Mock).mockResolvedValue(
      err(new SystemError(faker.lorem.lines(30))),
    );
  },
};

const meta: Meta<typeof Example> = {
  title: "Features/top/QueryForm",
  component: Example,
  args: {
    onQueryExecute: fn(),
  },
  beforeEach: () => {
    (meta.args?.onQueryExecute as Mock).mockResolvedValue(
      ok(faker.lorem.lines(30)),
    );
  },
};
export default meta;
