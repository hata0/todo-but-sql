import { TodoForm, TodoInput } from "../todo-form";
import { Task, TodoList } from "../todo-list";
import { Container } from "@/components/ui/container";
import { Main } from "@/components/ui/main";

type Props = {
  isLoading: boolean;
  tasks: Task[];
  onSubmit: (values: TodoInput) => Promise<void>;
};
export const Top = ({ isLoading, tasks, onSubmit }: Props) => {
  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <Container className="h-screen">
      <Main className="px-spacer-small py-spacer-normal">
        <TodoList tasks={tasks} />
        <TodoForm onSubmit={onSubmit} />
      </Main>
    </Container>
  );
};
