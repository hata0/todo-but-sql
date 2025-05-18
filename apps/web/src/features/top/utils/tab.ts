export const TABS = {
  All: "all",
  Uncompleted: "uncompleted",
  Completed: "completed",
} as const;
export const TABS_ARRAY = ["all", "uncompleted", "completed"] as const;
export type Tab = (typeof TABS_ARRAY)[number];
