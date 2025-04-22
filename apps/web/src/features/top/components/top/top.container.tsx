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
        const result = await fromPromise(db.select().from(tasksTable), (e) => {
          if (e instanceof Error) {
            return e.message;
          }
          return "Something went wrong";
        });
        if (result.isOk()) {
          setTasks(result.value);
        } else {
          setErrorMessage(result.error);
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
        if (!pg) {
          return err("Database not initialized");
        }

        const result = await fromPromise(pg.query(query), (e) => {
          if (e instanceof Error) {
            return e.message;
          }
          return "Something went wrong";
        });

        if (result.isOk()) {
          const tasks = (await db?.select().from(tasksTable)) ?? [];
          setTasks(tasks);
          return ok(JSON.stringify(result.value, null, 2));
        } else {
          return err(result.error);
        }
      }}
    />
  );
};
