import { UseFormReturn } from "react-hook-form";
import { ArrowRight, Database } from "lucide-react";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { AppError, Result } from "@/core/result";
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

export const queryInputSchema = z.object({
  query: z.string().min(1, "Query is required"),
});

export type QueryInput = z.infer<typeof queryInputSchema>;

export type QueryFormProps = {
  form: UseFormReturn<QueryInput>;
  onQueryExecute: (values: QueryInput) => Promise<Result<string, AppError>>;
  className?: string;
};
export const QueryForm = ({
  form,
  onQueryExecute,
  className,
}: QueryFormProps) => {
  const t = useTranslations("TopPage.QueryForm");

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
              <FormLabel>{t("label")}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="h-50 resize-none"
                  placeholder={t("placeholder")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="flex items-center"
          rightIcon={<ArrowRight />}
        >
          <Database />
          <span>{t("submit")}</span>
        </Button>
      </form>
    </Form>
  );
};
