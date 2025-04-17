import { z } from "zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUp } from "lucide-react";
import { TextField } from "@/components/my-ui/text-field";
import { IconButton } from "@/components/my-ui/icon-button";

const todoInputSchema = z.object({
  text: z.string().min(1),
});
export type TodoInput = z.infer<typeof todoInputSchema>;

type Props = {
  onSubmit: (values: TodoInput) => Promise<void>;
};
export const TodoForm = ({ onSubmit }: Props) => {
  const form = useForm<TodoInput>({
    resolver: zodResolver(todoInputSchema),
    defaultValues: {
      text: "",
    },
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-padding-8 flex w-full items-center justify-center"
      >
        <Controller
          control={form.control}
          name="text"
          render={({ field }) => (
            <TextField {...field} type="text" className="w-full" />
          )}
        ></Controller>
        <IconButton type="submit">
          {(props) => <ArrowUp {...props} />}
        </IconButton>
      </form>
    </FormProvider>
  );
};
