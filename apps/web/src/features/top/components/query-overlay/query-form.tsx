import { UseFormReturn } from "react-hook-form";
import { Result } from "neverthrow";
import { Database } from "lucide-react";
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

export type Props = {
  form: UseFormReturn<QueryInput>;
  onQueryExecute: (values: QueryInput) => Promise<Result<string, string>>;
  className?: string;
};
export const QueryForm = ({ form, onQueryExecute, className }: Props) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (values) => {
          const result = await onQueryExecute(values);
          if (result.isOk()) {
            form.reset();
          }
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
                <Textarea
                  {...field}
                  className="h-50 resize-none"
                  placeholder="Write your query here. For example, “SELECT * FROM tasks;”."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="flex items-center">
          <Database />
          <span>Execute Query</span>
        </Button>
      </form>
    </Form>
  );
};
