import { ThemeProvider as ThemeProviderPrimitive } from "next-themes";
import type { PropsWithChildren } from "react";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProviderPrimitive attribute="class">
      {children}
    </ThemeProviderPrimitive>
  );
};
