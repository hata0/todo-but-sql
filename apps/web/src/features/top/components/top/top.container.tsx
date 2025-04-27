"use client";

import { useEffect, useState } from "react";
import { Top as Presenter } from "./top";
import { useLocalDbContext } from "@/providers/local-db-provider";
import { deleteDatabaseAsync } from "@/utils/indexed-db";
import { usePgliteQuery } from "@/hooks/use-pglite-query";
import { listPgliteTasks } from "@/infrastructure/queries/list-pglite-tasks";
import { err, fromPromise, ok } from "@/core/result";
import { Task } from "@/domain/entities/task";

export const Top = () => {
  const { pg } = useLocalDbContext();
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
        // pg?.close()しておかないと、onblockedで弾かれる
        await pg?.close();
        return await deleteDatabaseAsync("/pglite/test");
      }}
      onQueryExecute={async ({ query }) => {
        if (!pg) {
          return err("Database not initialized");
        }

        const queryResult = await fromPromise(pg.query(query), (e) => {
          if (e instanceof Error) {
            return e.message;
          }
          return "Something went wrong";
        });

        if (queryResult.isOk()) {
          (await listTasks()).match(
            (tasks) => {
              setTasks(tasks);
            },
            ({ message }) => {
              setErrorMessage(message);
            },
          );

          return ok(JSON.stringify(queryResult.value, null, 2));
        } else {
          return err(queryResult.error);
        }
      }}
    />
  );
};
