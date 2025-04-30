import { ClipboardList, Database } from "lucide-react";
import { useQueryOverlayContext } from "../query-overlay";
import { Button } from "@/components/shadcn-ui/button";
import { cn } from "@/lib/utils";
import { heading } from "@/typography/heading";
import { text } from "@/typography/text";

export const TasksEmpty = () => {
  const { open } = useQueryOverlayContext();

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {/* 装飾用アイコン */}
      <div className="bg-muted mb-4 rounded-full p-3">
        <ClipboardList className="text-muted-foreground size-10" />
      </div>
      <h4 className={cn(heading.h4.className, "mb-1")}>There are no tasks</h4>
      <p className={cn(text.muted.className, "mb-4 max-w-sm")}>
        Add new tasks to keep track of <br /> what you have to do.
      </p>
      <Button className="animate-bounce" onClick={open}>
        <Database />
        <span>Write SQL</span>
      </Button>
    </div>
  );
};
