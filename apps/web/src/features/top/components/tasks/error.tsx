import { Braces, Database } from "lucide-react";
import { toast } from "sonner";
import { match } from "ts-pattern";
import { useTranslations } from "next-intl";
import { Button } from "@/components/shadcn-ui/button";
import { cn } from "@/lib/utils";
import { heading } from "@/typography/heading";
import { text } from "@/typography/text";
import { DeleteDatabaseResult } from "@/utils/indexed-db";
import { BaseError, DatabaseNotInitializedError } from "@/core/result";

type Props = {
  error: unknown;
  onResetDatabase: () => Promise<
    DeleteDatabaseResult | DatabaseNotInitializedError
  >;
};
export const TasksError = ({ error, onResetDatabase }: Props) => {
  const t = useTranslations("TopPage.TasksError");
  const errorMessage = match(error)
    .when(
      (e) => e instanceof BaseError,
      (e) => e.message,
    )
    .otherwise(() => "An unexpected error occurred");

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {/* 装飾用アイコン */}
      <div className="bg-muted mb-4 rounded-full p-3">
        <Braces className="text-muted-foreground size-10" />
      </div>
      <h4 className={cn(heading.h4.className, "mb-1")}>{t("title")}</h4>
      <p className={cn(text.muted.className, "mb-4 max-w-sm")}>
        {errorMessage}
      </p>
      <Button
        variant="destructive"
        onClick={async () => {
          const res = await onResetDatabase();
          match(res)
            .with("success", () => {
              window.location.reload();
            })
            .with("error", () => {
              toast.error(t("message.error"));
            })
            .with("blocked", () => {
              toast.error(t("message.blocked"));
            })
            .otherwise(() => {
              toast.error(t("message.uninitialized"));
            });
        }}
      >
        <Database />
        <span>{t("button.reset")}</span>
      </Button>
    </div>
  );
};
