"use client";

import type { UseInteractionsReturn } from "@floating-ui/react";
import { type PropsWithChildren, createContext, useContext } from "react";
import type { DropdownMenuRole } from "./menu";

type ContextType = {
  getItemPropsFactory: (index: number) => UseInteractionsReturn["getItemProps"];
  activeIndex: number | null;
  selectedIndex: number | null;
  role: DropdownMenuRole;
};
const DropdownMenuContext = createContext<ContextType | null>(null);
export const useDropdownMenuContext = () => {
  const context = useContext(DropdownMenuContext);

  if (!context) {
    throw new Error(
      "useDropdownMenuContext must be used within a <DropdownMenu />",
    );
  }

  return context;
};

export const DropdownMenuProvider = ({
  children,
  ...props
}: PropsWithChildren<ContextType>) => {
  return (
    <DropdownMenuContext.Provider value={props}>
      {children}
    </DropdownMenuContext.Provider>
  );
};
