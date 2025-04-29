"use client";

import { Dispatch, SetStateAction } from "react";
import { TasksFilter } from "./filter";
import { TasksList } from "./list";
import { DeleteDatabaseResult } from "@/utils/indexed-db";

type Props = {
  onResetDatabase: () => Promise<DeleteDatabaseResult | "uninitialized">;
  setIsQueryOverlayOpen: Dispatch<SetStateAction<boolean>>;
};
export const Tasks = ({ onResetDatabase, setIsQueryOverlayOpen }: Props) => {
  return (
    <TasksFilter>
      <TasksList
        onResetDatabase={onResetDatabase}
        setIsQueryOverlayOpen={setIsQueryOverlayOpen}
      />
    </TasksFilter>
  );
};
