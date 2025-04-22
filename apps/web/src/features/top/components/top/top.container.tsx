"use client";

import { useEffect, useState } from "react";
import { err, fromPromise, ok } from "neverthrow";
import { Task } from "../../types/task";
import { Top as Presenter } from "./top";
import { useLocalDbContext } from "@/providers/local-db-provider";
import { tasksTable } from "@/db/schema";
import { deleteDatabaseAsync } from "@/utils/indexed-db";

export const Top = () => {
  const { pg, db } = useLocalDbContext();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (db) {
        const tasksOrError = await fromPromise(
          db.select().from(tasksTable),
          (e) => {
            if (e instanceof Error) {
              return e.message;
            }
            return "Something went wrong";
          },
        );
        if (tasksOrError.isOk()) {
          setTasks(tasksOrError.value);
        } else {
          setErrorMessage(tasksOrError.error);
        }
        setIsLoading(false);
      }
    })();
  }, [db]);

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
        if (!pg || !db) {
          return err("Database not initialized");
        }

        const queryResult = await fromPromise(pg.query(query), (e) => {
          if (e instanceof Error) {
            return e.message;
          }
          return "Something went wrong";
        });

        if (queryResult.isOk()) {
          const tasksOrError = await fromPromise(
            db.select().from(tasksTable),
            (e) => {
              if (e instanceof Error) {
                return e.message;
              }
              return "Something went wrong";
            },
          );
          if (tasksOrError.isOk()) {
            setTasks(tasksOrError.value);
          } else {
            setErrorMessage(tasksOrError.error);
          }
          return ok(JSON.stringify(queryResult.value, null, 2));
        } else {
          return err(queryResult.error);
        }
      }}
    />
  );
};
