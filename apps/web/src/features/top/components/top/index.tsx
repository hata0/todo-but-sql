"use client";

import { TodoForm } from "../todo-form";
import { Container } from "@/components/ui/container";
import { Main } from "@/components/ui/main";
import { useLocalDbContext } from "@/providers/local-db-provider";

export const Top = () => {
  const { isLoading, pg } = useLocalDbContext();

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <Container>
      <Main>
        <TodoForm
          onSubmit={async ({ text }) => {
            pg.query(text);
          }}
        />
      </Main>
    </Container>
  );
};
