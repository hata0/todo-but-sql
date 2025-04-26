import { Dispatch, SetStateAction } from "react";
import { Task } from "../../types/task";
import { TasksError } from "./error";
import { TasksFilter } from "./filter";
import { TasksLoading } from "./loading";
import { TasksEmpty } from "./empty";
import { TasksList } from "./list";
import { DeleteDatabaseResult } from "@/utils/indexed-db";

type Props = {
  isLoading: boolean;
  errorMessage: string | null;
  tasks: Task[];
  onResetDatabase: () => Promise<DeleteDatabaseResult>;
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

  if (tasks.length === 0) {
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
