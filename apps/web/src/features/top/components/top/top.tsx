"use client";

import { useState } from "react";
import { TopHeader } from "../top-header";
import { QueryResult, QueryResultOverlay } from "../query-result-overlay";
import { TasksFilter, TasksList } from "../tasks";
import { QueryInput, QueryOverlay } from "../query-overlay";
import { Tab } from "../../utils/tab";
import { DeleteDatabaseResult } from "@/utils/indexed-db";
import { AppError, DatabaseNotInitializedError, Result } from "@/core/result";
import { ListTaskDto } from "@/infrastructure/queries/list-task-pglite";

type Props = {
  currentTab: Tab | null;
  listTask: {
    data?: ListTaskDto;
    error: Error | null;
    isLoading: boolean;
  };
  onTabChange: (nextTab: Tab | null) => void;
  onResetDatabase: () => Promise<
    DeleteDatabaseResult | DatabaseNotInitializedError
  >;
  onQueryExecute: (values: QueryInput) => Promise<Result<string, AppError>>;
};
export const Top = ({
  currentTab,
  listTask,
  onTabChange,
  onResetDatabase,
  onQueryExecute,
}: Props) => {
  const [queryResult, setQueryResult] = useState<QueryResult>({
    isOpen: false,
    status: "success",
    description: "",
  });
  const [isQueryOverlayOpen, setIsQueryOverlayOpen] = useState(false);

  return (
    <>
      <div>
        <TopHeader onOpenQueryOverlay={setIsQueryOverlayOpen} />
        <main>
          <div className="px-3 py-2">
            <TasksFilter currentTab={currentTab} onTabChange={onTabChange}>
              <TasksList
                tasks={listTask.data?.tasks}
                error={listTask.error}
                isLoading={listTask.isLoading}
                onResetDatabase={onResetDatabase}
                onOpenQueryOverlay={setIsQueryOverlayOpen}
              />
            </TasksFilter>
          </div>
        </main>
      </div>
      <QueryResultOverlay
        queryResult={queryResult}
        onOpenChange={(isOpen) => {
          setQueryResult((prev) => ({ ...prev, isOpen }));
        }}
      />
      <QueryOverlay
        isOpen={isQueryOverlayOpen}
        onOpenChange={setIsQueryOverlayOpen}
        onQueryExecute={async (values) => {
          const result = await onQueryExecute(values);

          setQueryResult(
            result.match(
              (description) => ({
                isOpen: true,
                status: "success",
                description,
              }),
              (e) => ({
                isOpen: true,
                status: "error",
                description: e.message,
              }),
            ),
          );

          return result;
        }}
      />
    </>
  );
};
