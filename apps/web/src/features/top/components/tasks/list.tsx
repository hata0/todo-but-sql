"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useQueryOverlayContext } from "../query-overlay";
import { TasksEmpty } from "./empty";
import { TasksError } from "./error";
import { TasksLoading } from "./loading";
import { cn } from "@/lib/utils";
import { text } from "@/typography/text";
import { Button } from "@/components/shadcn-ui/button";
import { useGetTasks } from "@/store/get-tasks";
import { DeleteDatabaseResult } from "@/utils/indexed-db";

export type Props = {
  onResetDatabase: () => Promise<DeleteDatabaseResult | "uninitialized">;
};
export const TasksList = ({ onResetDatabase }: Props) => {
  const { data, error, isLoading } = useGetTasks();
  const { open } = useQueryOverlayContext();

  if (error) {
    return <TasksError error={error} onResetDatabase={onResetDatabase} />;
  }

  if (isLoading || !data) {
    return <TasksLoading />;
  }

  if (!data.tasks.length) {
    return <TasksEmpty />;
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
              <Button variant="ghost" size="icon" onClick={open}>
                <Pencil />
              </Button>
              <Button variant="ghost" size="icon" onClick={open}>
                <Trash2 />
              </Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
