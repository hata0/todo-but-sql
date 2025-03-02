import { z } from "zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@/components/my-ui/text-field";

const todoInputSchema = z.object({
  text: z.string().min(1),
});
type TodoInput = z.infer<typeof todoInputSchema>;

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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          control={form.control}
          name="text"
          render={({ field }) => <TextField {...field} type="text" />}
        ></Controller>
      </form>
    </FormProvider>
  );
};
