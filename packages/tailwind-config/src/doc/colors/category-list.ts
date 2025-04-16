import { colors } from ".";

type Colors = keyof typeof colors;

export type BackgroundColor = Exclude<
  Colors,
  "foreground" | "border" | "input" | "ring" | "chart"
>;

export type TextColor = Exclude<
  Colors,
  "background" | "border" | "input" | "ring" | "chart"
>;

type DesignColor = Extract<Colors, "border" | "input" | "ring" | "chart">;

export const bgList: BackgroundColor[] = [
  "background",
  "card",
  "popover",
  "primary",
  "secondary",
  "muted",
  "accent",
  "destructive",
] as const;

export const textList: TextColor[] = [
  "foreground",
  "card",
  "popover",
  "primary",
  "secondary",
  "muted",
  "accent",
  "destructive",
] as const;

export const designList: DesignColor[] = [
  "border",
  "input",
  "ring",
  "chart",
] as const;
