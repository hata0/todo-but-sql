import { Braces, Database } from "lucide-react";
import { toast } from "sonner";
import { match } from "ts-pattern";
import { Button } from "@/components/shadcn-ui/button";
import { cn } from "@/lib/utils";
import { heading } from "@/typography/heading";
import { text } from "@/typography/text";
import { DeleteDatabaseResult } from "@/utils/indexed-db";

type Props = {
  errorMessage: string;
  onResetDatabase: () => Promise<DeleteDatabaseResult>;
};
export const TasksError = ({ errorMessage, onResetDatabase }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {/* 装飾用アイコン */}
      <div className="bg-muted mb-4 rounded-full p-3">
        <Braces className="text-muted-foreground size-10" />
      </div>
      <h4 className={cn(heading.h4.className, "mb-1")}>Failed to get tasks</h4>
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
              toast.error("Database deletion failed");
            })
            .with("blocked", () => {
              toast.error(
                "Database deletion blocked. Database may be in use now.",
              );
            })
            .exhaustive();
        }}
      >
        <Database />
        <span>Reset Database</span>
      </Button>
    </div>
  );
};
