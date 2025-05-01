import { PropsWithChildren } from "react";
import { match } from "ts-pattern";
import { useTranslations } from "next-intl";
import { TABS, useTabQueryState } from "../../utils/tab";
import { AnimatedBackground } from "@/components/motion-primitives/animated-background";
import { Tabs, TabsList, TabsTrigger } from "@/components/shadcn-ui/tabs";

export const TasksFilter = ({ children }: PropsWithChildren) => {
  const [currentTab, setCurrentTab] = useTabQueryState();
  const t = useTranslations("TopPage");

  return (
    <Tabs defaultValue={currentTab ?? TABS[0]}>
      <TabsList className="w-full">
        <AnimatedBackground
          defaultValue={currentTab ?? TABS[0]}
          className="bg-background rounded-md"
          transition={{
            type: "spring",
            bounce: 0.2,
            duration: 0.3,
          }}
          onValueChange={(id) => {
            setCurrentTab(
              match(id)
                .with("uncompleted", (v) => v)
                .with("completed", (v) => v)
                .otherwise(() => null),
            );
          }}
        >
          {TABS.map((tab) => (
            <TabsTrigger value={tab} data-id={tab} key={tab}>
              {t(`tab.${tab}`)}
            </TabsTrigger>
          ))}
        </AnimatedBackground>
      </TabsList>
      {children}
    </Tabs>
  );
};
