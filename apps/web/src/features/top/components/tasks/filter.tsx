import { ReactNode, useState } from "react";
import { match } from "ts-pattern";
import { Task } from "../../types/task";
import { AnimatedBackground } from "@/components/motion-primitives/animated-background";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn-ui/tabs";

type TabWithLabel = {
  value: string;
  label: string;
};
const TABS = [
  { value: "all", label: "All" },
  { value: "incomplete", label: "Incomplete" },
  { value: "completed", label: "Completed" },
] as const satisfies TabWithLabel[];
type Tab = (typeof TABS)[number]["value"];

type Props = {
  tasks: Task[];
  children: (filteredTasks: Task[]) => ReactNode;
};
export const TasksFilter = ({ tasks, children }: Props) => {
  const [activeTab, setActiveTab] = useState<Tab>(TABS[0].value);

  const filteredTasks = tasks.filter((task) =>
    match(activeTab)
      .with("all", () => true)
      .with("incomplete", () => !task.isCompleted)
      .otherwise(() => task.isCompleted),
  );

  return (
    <Tabs
      defaultValue={TABS[0].value}
      onValueChange={(t) => setActiveTab(t as Tab)}
    >
      <TabsList className="w-full">
        <AnimatedBackground
          defaultValue={TABS[0].value}
          className="bg-background rounded-md"
          transition={{
            type: "spring",
            bounce: 0.2,
            duration: 0.3,
          }}
        >
          {TABS.map((tab) => (
            <TabsTrigger value={tab.value} data-id={tab.value} key={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </AnimatedBackground>
      </TabsList>
      {TABS.map((tab) => (
        <TabsContent value={tab.value} className="mt-0" key={tab.value}>
          {children(filteredTasks)}
        </TabsContent>
      ))}
    </Tabs>
  );
};
