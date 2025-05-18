"use client";

import { PropsWithChildren, useState } from "react";
import { match } from "ts-pattern";
import { useTranslations } from "next-intl";
import { Tab, TABS, TABS_ARRAY } from "../../utils/tab";
import { AnimatedBackground } from "@/components/motion-primitives/animated-background";
import { Tabs, TabsList, TabsTrigger } from "@/components/shadcn-ui/tabs";

type Props = {
  currentTab: Tab | null;
  onTabChange: (nextTab: Tab | null) => void;
};
export const TasksFilter = ({
  currentTab: defaultTab,
  onTabChange,
  children,
}: PropsWithChildren<Props>) => {
  const [currentTab, setCurrentTab] = useState<Tab>(defaultTab ?? TABS.All);
  const t = useTranslations("TopPage");

  return (
    <Tabs
      value={currentTab}
      onValueChange={(t) => {
        setCurrentTab(
          match(t)
            .with(TABS.Uncompleted, (v) => v)
            .with(TABS.Completed, (v) => v)
            .otherwise(() => "all"),
        );
        onTabChange(
          match(t)
            .with(TABS.Uncompleted, (v) => v)
            .with(TABS.Completed, (v) => v)
            .otherwise(() => null),
        );
      }}
    >
      <TabsList className="w-full">
        <AnimatedBackground
          defaultValue={currentTab ?? TABS.All}
          className="bg-background rounded-md"
          transition={{
            type: "spring",
            bounce: 0.2,
            duration: 0.3,
          }}
        >
          {TABS_ARRAY.map((tab) => (
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
