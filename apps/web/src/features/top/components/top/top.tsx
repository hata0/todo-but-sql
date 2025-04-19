import Link from "next/link";
import { Task } from "../../types/task";
import { QueryDrawer } from "../query-drawer";
import { Props as QueryFormProps } from "../query-drawer/query-form";
import { Button } from "@/components/shadcn-ui/button";
import { cn } from "@/lib/utils";
import { text } from "@/typography/text";

type Props = {
  isLoading: boolean;
  tasks: Task[];
} & Pick<QueryFormProps, "onQueryExecute">;
export const Top = ({ isLoading, tasks, onQueryExecute }: Props) => {
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
        <div>
          <ul className="flex flex-col gap-y-3 p-3 md:p-6">
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
                      task.isCompleted
                        ? "text-muted-foreground line-through"
                        : "",
                    )}
                  >
                    {task.title}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </div>
  );
};
