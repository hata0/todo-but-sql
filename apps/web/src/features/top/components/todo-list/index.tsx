import { ListItem } from "@/components/my-ui/list-item";
import { font } from "@/config/font";

type Task = {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  tasks: Task[];
};
export const TodoList = ({ tasks }: Props) => {
  return (
    <div>
      <h2 className={font.heading}>タスク一覧</h2>
      <ul>
        {tasks.map(({ id, title }) => (
          <ListItem
            headline={(props) => (
              <div key={id} {...props}>
                {title}
              </div>
            )}
          />
        ))}
      </ul>
    </div>
  );
};
