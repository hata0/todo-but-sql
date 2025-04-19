"use client";

import { useEffect, useState } from "react";
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
        await pg?.query(query);
      }}
    />
  );
};
