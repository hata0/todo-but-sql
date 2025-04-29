import { Dispatch, SetStateAction } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { TasksEmpty } from "./empty";
import { cn } from "@/lib/utils";
import { text } from "@/typography/text";
import { Button } from "@/components/shadcn-ui/button";
import { useGetTasksSuspense } from "@/store/get-tasks";

type Props = {
  setIsQueryOverlayOpen: Dispatch<SetStateAction<boolean>>;
};
export const TasksList = ({ setIsQueryOverlayOpen }: Props) => {
  const { data } = useGetTasksSuspense();

  if (!data.tasks.length) {
    return <TasksEmpty setIsQueryOverlayOpen={setIsQueryOverlayOpen} />;
  }

  return (
    <ul className="grid gap-3 lg:grid-cols-2">
      {data.tasks.map(({ id, title, isCompleted }) => {
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
