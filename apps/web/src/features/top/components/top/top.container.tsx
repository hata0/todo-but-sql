"use client";

import { useEffect, useState } from "react";
import { Top as Presenter } from "./top";
import { usePgliteQuery } from "@/hooks/use-pglite-query";
import { listPgliteTasks } from "@/infrastructure/queries/list-pglite-tasks";
import { err, ok } from "@/core/result";
import { Task } from "@/domain/entities/task";
import { useDeleteDatabase, useExecuteQuery } from "@/db/utils";

export const Top = () => {
  // const { pg } = useLocalDbContext();
  const executeQuery = useExecuteQuery();
  const deleteDatabase = useDeleteDatabase();
  const listTasks = usePgliteQuery(listPgliteTasks);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      (await listTasks()).match(
        (tasks) => {
          setTasks(tasks);
        },
        ({ message }) => {
          setErrorMessage(message);
        },
      );

      setIsLoading(false);
    })();
  }, [listTasks]);

  return (
    <Presenter
      isLoading={isLoading}
      tasks={tasks}
      errorMessage={errorMessage}
      onResetDatabase={async () => {
        return await deleteDatabase();
      }}
      onQueryExecute={async ({ query }) => {
        return (await executeQuery(query)).match(
          async (result) => {
            (await listTasks()).match(
              (tasks) => {
                setTasks(tasks);
              },
              ({ message }) => {
                setErrorMessage(message);
              },
            );

            return ok(JSON.stringify(result, null, 2));
          },
          (e) => {
            return err(e.message);
          },
        );
      }}
    />
  );
};
