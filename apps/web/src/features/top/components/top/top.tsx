import Link from "next/link";
import { useState } from "react";
import { match } from "ts-pattern";
import { ClipboardList, Database, LoaderCircle } from "lucide-react";
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
import { heading } from "@/typography/heading";

type Props = {
  isLoading: boolean;
  tasks: Task[];
} & Pick<QueryFormProps, "onQueryExecute">;
export const Top = ({ isLoading, tasks, onQueryExecute }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const filteredTasks = tasks.filter((task) =>
    match(activeTab)
      .with("all", () => true)
      .with("incomplete", () => !task.isCompleted)
      .otherwise(() => task.isCompleted),
  );

  return (
    <div>
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 flex h-14 items-center justify-between gap-2 border-b border-dashed px-2 backdrop-blur">
        <Button asChild variant="ghost">
          <Link href="/" className={text.large.className}>
            Todo but SQL
          </Link>
        </Button>
        <QueryDrawer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onQueryExecute={onQueryExecute}
        />
      </header>
      <main>
        <div className="px-3 py-2">
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all" className="cursor-pointer">
                All
              </TabsTrigger>
              <TabsTrigger value="incomplete" className="cursor-pointer">
                Incomplete
              </TabsTrigger>
              <TabsTrigger value="completed" className="cursor-pointer">
                Completed
              </TabsTrigger>
            </TabsList>
            {isLoading ? (
              <div className="flex w-full items-center justify-center pt-4">
                <LoaderCircle className="size-8 animate-spin text-sky-400" />
              </div>
            ) : tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                {/* 装飾用アイコン */}
                <div className="bg-muted mb-4 rounded-full p-3">
                  <ClipboardList className="text-muted-foreground size-10" />
                </div>
                <h4 className={cn(heading.h4.className, "mb-1")}>
                  There are no tasks
                </h4>
                <p className={cn(text.muted.className, "mb-4 max-w-sm")}>
                  Add new tasks to keep track of <br /> what you have to do.
                </p>
                <Button
                  className="cursor-pointer"
                  onClick={() => setIsOpen(true)}
                >
                  <Database className="mr-2 size-4" />
                  Write SQL
                </Button>
              </div>
            ) : (
              <>
                <TabsContent value="all" className="mt-0">
                  <TaskItems tasks={filteredTasks} />
                </TabsContent>
                <TabsContent value="incomplete" className="mt-0">
                  <TaskItems tasks={filteredTasks} />
                </TabsContent>
                <TabsContent value="completed" className="mt-0">
                  <TaskItems tasks={filteredTasks} />
                </TabsContent>
              </>
            )}
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
