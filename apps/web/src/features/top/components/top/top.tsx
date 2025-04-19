"use client";

import Link from "next/link";
import { useState } from "react";
import { match } from "ts-pattern";
import { ClipboardList, Database, LoaderCircle } from "lucide-react";
import { Result } from "neverthrow";
import Image from "next/image";
import { QueryInput, Task } from "../../types/task";
import { QueryDrawer } from "../query-drawer";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/shadcn-ui/alert-dialog";
import { ModeToggle } from "@/components/shadcn-ui/mode-toggle";

type Props = {
  isLoading: boolean;
  tasks: Task[];
  onQueryExecute: (values: QueryInput) => Promise<Result<string, string>>;
};
export const Top = ({ isLoading, tasks, onQueryExecute }: Props) => {
  const [isQueryDrawerOpen, setIsQueryDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const filteredTasks = tasks.filter((task) =>
    match(activeTab)
      .with("all", () => true)
      .with("incomplete", () => !task.isCompleted)
      .otherwise(() => task.isCompleted),
  );

  return (
    <div>
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 flex h-14 items-center justify-between gap-2 border-b border-dashed px-2 backdrop-blur transition duration-500 ease-in-out">
        <Button asChild variant="ghost" size="lg">
          <Link href="/" className={text.large.className}>
            <Image src="/logo.png" alt="logo" width={32} height={32} />
            <span>Todo but SQL</span>
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <QueryDrawer
            isOpen={isQueryDrawerOpen}
            setIsOpen={setIsQueryDrawerOpen}
            onQueryExecute={async (values) => {
              const result = await onQueryExecute(values);
              if (result.isOk()) {
                setTitle("Success");
                setDescription(result.value);
              } else {
                setTitle("Error");
                setDescription(result.error);
              }
              setIsAlertDialogOpen(true);
            }}
          />
          <ModeToggle />
        </div>
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
                  onClick={() => setIsQueryDrawerOpen(true)}
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
      <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription className="max-h-80 overflow-auto whitespace-pre-wrap text-start">
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
