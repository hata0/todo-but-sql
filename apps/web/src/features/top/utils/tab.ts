import { parseAsStringLiteral, useQueryState } from "nuqs";
import { match } from "ts-pattern";
import { ListTaskInput } from "@/infrastructure/queries/list-task-pglite";

export const TABS = ["all", "uncompleted", "completed"] as const;

export type Tab = (typeof TABS)[number];

export const useTabQueryState = () =>
  useQueryState("tab", parseAsStringLiteral(TABS));

export const tabToQuery = (tab: Tab | null): ListTaskInput => {
  return match(tab)
    .returnType<ListTaskInput>()
    .with("uncompleted", () => ({ isCompleted: false }))
    .with("completed", () => ({ isCompleted: true }))
    .otherwise(() => undefined);
};
