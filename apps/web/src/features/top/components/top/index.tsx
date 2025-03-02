"use client";

import { useEffect, useState } from "react";
import { TodoForm } from "../todo-form";
import { Task, TodoList } from "../todo-list";
import { Container } from "@/components/ui/container";
import { Main } from "@/components/ui/main";
import { useLocalDbContext } from "@/providers/local-db-provider";
import { tasksTable } from "@/db/schema";

export const Top = () => {
  const { isLoading, pg, db } = useLocalDbContext();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    (async () => {
      if (!isLoading) {
        const tasks = await db?.select().from(tasksTable);
        setTasks(tasks);
      }
    })();
  }, [db, isLoading]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <Container className="h-screen">
      <Main className="px-spacer-small py-spacer-normal">
        <TodoList tasks={tasks} />
        <TodoForm
          onSubmit={async ({ text }) => {
            const res = await pg.query(text);
            console.log(res);
          }}
        />
      </Main>
    </Container>
  );
};
