import { Dispatch, SetStateAction } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { text } from "@/typography/text";
import { Button } from "@/components/shadcn-ui/button";
import { Task } from "@/domain/entities/task";

type Props = {
  tasks: Task[];
  setIsQueryOverlayOpen: Dispatch<SetStateAction<boolean>>;
};
export const TasksList = ({ tasks, setIsQueryOverlayOpen }: Props) => {
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
