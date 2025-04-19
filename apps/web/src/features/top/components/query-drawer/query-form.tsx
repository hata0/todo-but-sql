import { UseFormReturn } from "react-hook-form";
import { QueryInput } from "../../types/task";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn-ui/form";
import { Textarea } from "@/components/shadcn-ui/textarea";
import { Button } from "@/components/shadcn-ui/button";
import { cn } from "@/lib/utils";
import { ShimmerButton } from "@/components/magic-ui/shimmer-button";

export type Props = {
  form: UseFormReturn<QueryInput>;
  onQueryExecute: (values: QueryInput) => Promise<void>;
  className?: string;
};
export const QueryForm = ({ form, onQueryExecute, className }: Props) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (values) => {
          await onQueryExecute(values);
          form.reset();
        })}
        className={cn("flex flex-col gap-4", className)}
      >
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Query</FormLabel>
              <FormControl>
                <Textarea {...field} className="h-50 resize-none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
