import { Task } from "../../types/task";
import { cn } from "@/lib/utils";
import { TypographyMedium } from "@/components/my-ui/typography/medium";

type Props = {
  isLoading: boolean;
  tasks: Task[];
};
export const Top = ({ isLoading, tasks }: Props) => {
  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div>
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
                  <TypographyMedium
                    className={
                      task.isCompleted
                        ? "text-muted-foreground line-through"
                        : ""
                    }
                  >
                    {task.title}
                  </TypographyMedium>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </div>
  );
};
