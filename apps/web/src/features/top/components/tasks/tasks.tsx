import { Dispatch, SetStateAction } from "react";
import { TasksError } from "./error";
import { TasksFilter } from "./filter";
import { TasksLoading } from "./loading";
import { TasksEmpty } from "./empty";
import { TasksList } from "./list";
import { DeleteDatabaseResult } from "@/utils/indexed-db";
import { Task } from "@/domain/entities/task";

type Props = {
  isLoading: boolean;
  errorMessage: string | null;
  tasks: Task[];
  onResetDatabase: () => Promise<DeleteDatabaseResult | "uninitialized">;
  setIsQueryOverlayOpen: Dispatch<SetStateAction<boolean>>;
};
export const Tasks = ({
  isLoading,
  errorMessage,
  tasks,
  onResetDatabase,
  setIsQueryOverlayOpen,
}: Props) => {
  if (isLoading) {
    return <TasksLoading />;
  }

  if (errorMessage) {
    return (
      <TasksError
        errorMessage={errorMessage}
        onResetDatabase={onResetDatabase}
      />
    );
  }

  if (!tasks.length) {
    return <TasksEmpty setIsQueryOverlayOpen={setIsQueryOverlayOpen} />;
  }

  return (
    <TasksFilter tasks={tasks}>
      {(filteredTasks) => (
        <TasksList
          tasks={filteredTasks}
          setIsQueryOverlayOpen={setIsQueryOverlayOpen}
        />
      )}
    </TasksFilter>
  );
};
