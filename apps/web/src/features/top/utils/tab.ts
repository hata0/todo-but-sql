import { parseAsStringLiteral, useQueryState } from "nuqs";
import { match } from "ts-pattern";
import { GetTasksQueryInput } from "@/infrastructure/queries/get-tasks";

export const TABS = ["all", "uncompleted", "completed"] as const;

export type Tab = (typeof TABS)[number];

export const useTabQueryState = () =>
  useQueryState("tab", parseAsStringLiteral(TABS));

export const tabToQuery = (tab: Tab | null): GetTasksQueryInput => {
  return match(tab)
    .returnType<GetTasksQueryInput>()
    .with("uncompleted", () => ({ isCompleted: false }))
    .with("completed", () => ({ isCompleted: true }))
    .otherwise(() => undefined);
};
