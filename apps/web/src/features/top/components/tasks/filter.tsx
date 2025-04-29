import { PropsWithChildren } from "react";
import { AnimatedBackground } from "@/components/motion-primitives/animated-background";
import { Tabs, TabsList, TabsTrigger } from "@/components/shadcn-ui/tabs";

type TabWithLabel = {
  value: string;
  label: string;
};
const TABS = [
  { value: "all", label: "All" },
  { value: "uncompleted", label: "Uncompleted" },
  { value: "completed", label: "Completed" },
] as const satisfies TabWithLabel[];

export const TasksFilter = ({ children }: PropsWithChildren) => {
  return (
    <Tabs defaultValue={TABS[0].value}>
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
      {children}
    </Tabs>
  );
};
