import { Dispatch, SetStateAction } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Task } from "../../types/task";
import { cn } from "@/lib/utils";
import { text } from "@/typography/text";
import { Button } from "@/components/shadcn-ui/button";

type Props = {
  tasks: Task[];
  setIsQueryOverlayOpen: Dispatch<SetStateAction<boolean>>;
};
export const TaskList = ({ tasks, setIsQueryOverlayOpen }: Props) => {
  return (
    <ul className="grid gap-3 lg:grid-cols-2">
      {tasks.map((task) => {
        return (
          <li
            key={task.id}
            className={cn(
              "bg-card rounded-xl border p-3",
              "flex items-center justify-between",
              { "bg-muted/50": task.isCompleted },
            )}
          >
            <div
              className={cn(
                text.medium.className,
                task.isCompleted ? "text-muted-foreground line-through" : "",
              )}
            >
              {task.title}
            </div>
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsQueryOverlayOpen(true)}
              >
                <Pencil />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsQueryOverlayOpen(true)}
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
