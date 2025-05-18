import { Pencil, Trash2 } from "lucide-react";
import { TasksEmpty } from "./empty";
import { TasksError } from "./error";
import { TasksLoading } from "./loading";
import { cn } from "@/lib/utils";
import { text } from "@/typography/text";
import { Button } from "@/components/shadcn-ui/button";
import { DeleteDatabaseResult } from "@/utils/indexed-db";
import { DatabaseNotInitializedError } from "@/core/result";
import { Task } from "@/domain/entities/task";

export type Props = {
  tasks?: Task[];
  error: Error | null;
  isLoading: boolean;
  onResetDatabase: () => Promise<
    DeleteDatabaseResult | DatabaseNotInitializedError
  >;
  onOpenQueryOverlay: (isOpen: true) => void;
};
export const TasksList = ({
  tasks,
  error,
  isLoading,
  onResetDatabase,
  onOpenQueryOverlay,
}: Props) => {
  if (error) {
    return <TasksError error={error} onResetDatabase={onResetDatabase} />;
  }

  if (isLoading || tasks === undefined) {
    return <TasksLoading />;
  }

  if (tasks.length === 0) {
    return <TasksEmpty onOpenQueryOverlay={onOpenQueryOverlay} />;
  }

  return (
    <ul className="grid gap-3 lg:grid-cols-2">
      {tasks.map(({ id, title, isCompleted }) => {
        return (
          <li
            key={id}
            className={cn(
              "bg-card rounded-xl border p-3",
              "flex items-center justify-between",
              { "bg-muted/50": isCompleted },
            )}
          >
            <div
              className={cn(
                text.medium.className,
                isCompleted ? "text-muted-foreground line-through" : "",
              )}
            >
              {title}
            </div>
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenQueryOverlay(true)}
              >
                <Pencil />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenQueryOverlay(true)}
              >
                <Trash2 />
              </Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
