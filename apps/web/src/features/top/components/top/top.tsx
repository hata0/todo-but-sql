import Link from "next/link";
import { useState } from "react";
import { match } from "ts-pattern";
import { Task } from "../../types/task";
import { QueryDrawer } from "../query-drawer";
import { Props as QueryFormProps } from "../query-drawer/query-form";
import { Button } from "@/components/shadcn-ui/button";
import { cn } from "@/lib/utils";
import { text } from "@/typography/text";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn-ui/tabs";

type Props = {
  isLoading: boolean;
  tasks: Task[];
} & Pick<QueryFormProps, "onQueryExecute">;
export const Top = ({ isLoading, tasks, onQueryExecute }: Props) => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredTasks = tasks.filter((task) =>
    match(activeTab)
      .with("all", () => true)
      .with("incomplete", () => !task.isCompleted)
      .otherwise(() => task.isCompleted),
  );

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 flex h-14 items-center justify-between gap-2 border-b border-dashed px-2 backdrop-blur">
        <Button asChild variant="ghost">
          <Link href="/" className={text.large.className}>
            Todo but SQL
          </Link>
        </Button>
        <QueryDrawer onQueryExecute={onQueryExecute} />
      </header>
      <main>
        <div className="px-3 py-2">
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="incomplete">Incomplete</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-0">
              <TaskItems tasks={filteredTasks} />
            </TabsContent>
            <TabsContent value="incomplete" className="mt-0">
              <TaskItems tasks={filteredTasks} />
            </TabsContent>
            <TabsContent value="completed" className="mt-0">
              <TaskItems tasks={filteredTasks} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

type TaskItemsProps = {
  tasks: Task[];
};
const TaskItems = ({ tasks }: TaskItemsProps) => {
  return (
    <ul className="flex flex-col gap-y-3 md:p-6">
      {tasks.map((task) => {
        return (
          <li
            key={task.id}
            className={cn(
              "bg-card rounded-xl border p-3",
              "flex items-center justify-between",
              { "bg-muted": task.isCompleted },
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
          </li>
        );
      })}
    </ul>
  );
};
