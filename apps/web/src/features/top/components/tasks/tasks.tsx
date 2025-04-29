import { Dispatch, SetStateAction, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { TasksError } from "./error";
import { TasksFilter } from "./filter";
import { TasksLoading } from "./loading";
import { TasksList } from "./list";
import { DeleteDatabaseResult } from "@/utils/indexed-db";

type Props = {
  onResetDatabase: () => Promise<DeleteDatabaseResult | "uninitialized">;
  setIsQueryOverlayOpen: Dispatch<SetStateAction<boolean>>;
};
export const Tasks = ({ onResetDatabase, setIsQueryOverlayOpen }: Props) => {
  return (
    <TasksFilter>
      <ErrorBoundary
        FallbackComponent={({ error }) => (
          <TasksError error={error} onResetDatabase={onResetDatabase} />
        )}
      >
        <Suspense fallback={<TasksLoading />}>
          <TasksList setIsQueryOverlayOpen={setIsQueryOverlayOpen} />
        </Suspense>
      </ErrorBoundary>
    </TasksFilter>
  );
};
