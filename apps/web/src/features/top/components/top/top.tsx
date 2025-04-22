"use client";

import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { match } from "ts-pattern";
import {
  Braces,
  ClipboardList,
  Database,
  LoaderCircle,
  Pencil,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
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
import { AnimatedBackground } from "@/components/motion-primitives/animated-background";
import { DeleteDatabaseResult } from "@/utils/indexed-db";

type Props = {
  isLoading: boolean;
  tasks: Task[];
  errorMessage: string | null;
  onResetDatabase: () => Promise<DeleteDatabaseResult>;
} & Pick<QueryFormProps, "onQueryExecute">;
export const Top = ({
  isLoading,
  tasks,
  errorMessage,
  onResetDatabase,
  onQueryExecute,
}: Props) => {
  const [isQueryDrawerOpen, setIsQueryDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [alertDialog, setAlertDialog] = useState<{
    isOpen: boolean;
    status: "success" | "error";
    description: string;
  }>({ isOpen: false, status: "success", description: "" });

  const filteredTasks = tasks.filter((task) =>
    match(activeTab)
      .with("all", () => true)
      .with("incomplete", () => !task.isCompleted)
      .otherwise(() => task.isCompleted),
  );

  return (
    <div>
      <header className="z-2 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 flex h-14 items-center justify-between gap-2 border-b border-dashed px-2 backdrop-blur transition duration-500 ease-in-out">
        <Button asChild variant="ghost" size="lg">
          <Link href="/" className={text.large.className}>
            <Image src="/logo.png" alt="logo" width={32} height={32} />
            <span className="animate-text-gradient bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent">
              Todo but SQL
            </span>
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <QueryDrawer
            isOpen={isQueryDrawerOpen}
            setIsOpen={setIsQueryDrawerOpen}
            onQueryExecute={async (values) => {
              const result = await onQueryExecute(values);
              if (result.isOk()) {
                setAlertDialog({
                  isOpen: true,
                  status: "success",
                  description: result.value,
                });
              } else {
                setAlertDialog({
                  isOpen: true,
                  status: "error",
                  description: result.error,
                });
              }
              return result;
            }}
          />
          <ModeToggle />
        </div>
      </header>
      <main>
        <div className="px-3 py-2">
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="w-full">
              <AnimatedBackground
                defaultValue="all"
                className="bg-background rounded-md"
                transition={{
                  type: "spring",
                  bounce: 0.2,
                  duration: 0.3,
                }}
              >
                <TabsTrigger value="all" data-id="all">
                  All
                </TabsTrigger>
                <TabsTrigger value="incomplete" data-id="incomplete">
                  Incomplete
                </TabsTrigger>
                <TabsTrigger value="completed" data-id="completed">
                  Completed
                </TabsTrigger>
              </AnimatedBackground>
            </TabsList>
            {isLoading ? (
              <div className="flex w-full items-center justify-center pt-4">
                <LoaderCircle className="size-8 animate-spin text-sky-400" />
              </div>
            ) : errorMessage ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                {/* 装飾用アイコン */}
                <div className="bg-muted mb-4 rounded-full p-3">
                  <Braces className="text-muted-foreground size-10" />
                </div>
                <h4 className={cn(heading.h4.className, "mb-1")}>
                  Failed to get tasks
                </h4>
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
                      });
                  }}
                >
                  <Database />
                  <span>Reset Database</span>
                </Button>
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
                  className="animate-bounce"
                  onClick={() => setIsQueryDrawerOpen(true)}
                >
                  <Database />
                  <span>Write SQL</span>
                </Button>
              </div>
            ) : (
              <>
                <TabsContent value="all" className="mt-0">
                  <TaskItems
                    tasks={filteredTasks}
                    setIsQueryDrawerOpen={setIsQueryDrawerOpen}
                  />
                </TabsContent>
                <TabsContent value="incomplete" className="mt-0">
                  <TaskItems
                    tasks={filteredTasks}
                    setIsQueryDrawerOpen={setIsQueryDrawerOpen}
                  />
                </TabsContent>
                <TabsContent value="completed" className="mt-0">
                  <TaskItems
                    tasks={filteredTasks}
                    setIsQueryDrawerOpen={setIsQueryDrawerOpen}
                  />
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      </main>
      <AlertDialog
        open={alertDialog.isOpen}
        onOpenChange={(isOpen) => {
          setAlertDialog((prev) => ({ ...prev, isOpen }));
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle
              className={
                alertDialog.status === "error" ? "text-destructive" : ""
              }
            >
              {alertDialog.status === "success" ? "Success" : "Error"}
            </AlertDialogTitle>
            <AlertDialogDescription className="max-h-80 overflow-auto whitespace-pre-wrap text-start">
              {alertDialog.description}
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
  setIsQueryDrawerOpen: Dispatch<SetStateAction<boolean>>;
};
const TaskItems = ({ tasks, setIsQueryDrawerOpen }: TaskItemsProps) => {
  return (
    <ul className="flex flex-col gap-y-3 md:p-6">
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
                onClick={() => setIsQueryDrawerOpen(true)}
              >
                <Pencil />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsQueryDrawerOpen(true)}
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
