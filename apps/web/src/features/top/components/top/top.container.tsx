"use client";

import { useEffect, useState } from "react";
import { err, fromPromise, ok } from "neverthrow";
import { Task } from "../../types/task";
import { Top as Presenter } from "./top";
import { useLocalDbContext } from "@/providers/local-db-provider";
import { tasksTable } from "@/db/schema";

export const Top = () => {
  const { pg, db } = useLocalDbContext();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (db) {
        const tasks = await db.select().from(tasksTable);
        setTasks(tasks);
        setIsLoading(false);
      }
    })();
  }, [db]);

  return (
    <Presenter
      isLoading={isLoading}
      tasks={tasks}
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
