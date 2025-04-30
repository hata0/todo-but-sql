"use client";

import { useState } from "react";
import { TopHeader } from "../top-header";
import { QueryResult, QueryResultOverlay } from "../query-result-overlay";
import { TasksFilter, TasksList } from "../tasks";
import { QueryInput, QueryOverlay } from "../query-overlay";
import { DeleteDatabaseResult } from "@/utils/indexed-db";
import { AppError, Result } from "@/core/result";

type Props = {
  onResetDatabase: () => Promise<DeleteDatabaseResult | "uninitialized">;
  onQueryExecute: (values: QueryInput) => Promise<Result<string, AppError>>;
};
export const Top = ({ onResetDatabase, onQueryExecute }: Props) => {
  const [queryResult, setQueryResult] = useState<QueryResult>({
    isOpen: false,
    status: "success",
    description: "",
  });

  return (
    <QueryOverlay
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
    >
      <div>
        <TopHeader />
        <main>
          <div className="px-3 py-2">
            <TasksFilter>
              <TasksList onResetDatabase={onResetDatabase} />
            </TasksFilter>
          </div>
        </main>
      </div>
      <QueryResultOverlay
        queryResult={queryResult}
        setQueryResult={setQueryResult}
      />
    </QueryOverlay>
  );
};
