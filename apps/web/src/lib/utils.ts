import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

export const customTwMerge = extendTailwindMerge<never, "borderRadius">({
  extend: {
    theme: {
      spacing: [
        "padding-8",
        "padding-12",
        "padding-16",
        "spacer-small",
        "spacer-normal",
      ],
      // なんかこうすると動いた
      borderRadius: [
        "radius-none",
        "radius-xs",
        "radius-sm",
        "radius-md",
        "radius-lg",
        "radius-xl",
        "radius-full",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
