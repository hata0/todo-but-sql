import { parseAsStringLiteral, useQueryState } from "nuqs";

export const TABS = ["all", "completed", "uncompleted"] as const;

export type Tab = (typeof TABS)[number];

export const useTabQueryState = () =>
  useQueryState("tab", parseAsStringLiteral(TABS));
