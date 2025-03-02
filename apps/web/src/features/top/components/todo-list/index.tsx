import { ListItem } from "@/components/my-ui/list-item";
import { font } from "@/config/font";

export type Task = {
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type Props = {
  tasks: Task[];
};
export const TodoList = ({ tasks }: Props) => {
  console.log(tasks);
  return (
    <div className="size-full flex flex-col items-center gap-spacer-normal">
      <h2 className={font.heading}>タスク一覧</h2>
      {tasks.length !== 0 ? (
        <ul>
          {tasks.map(({ id, title }) => (
            <ListItem
              key={id}
              headline={(props) => <div {...props}>{title}</div>}
            />
          ))}
        </ul>
      ) : (
        <div className={font.title}>そもそもタスク作ってない</div>
      )}
    </div>
  );
};
