"use client";

import { useState } from "react";
import { Props as QueryFormProps } from "../query-overlay/query-form";
import { TopHeader } from "../top-header";
import { QueryResult, QueryResultOverlay } from "../query-result-overlay";
import { Tasks } from "../tasks";
import { DeleteDatabaseResult } from "@/utils/indexed-db";

type Props = {
  onResetDatabase: () => Promise<DeleteDatabaseResult | "uninitialized">;
} & Pick<QueryFormProps, "onQueryExecute">;
export const Top = ({ onResetDatabase, onQueryExecute }: Props) => {
  const [isQueryOverlayOpen, setIsQueryOverlayOpen] = useState(false);
  const [queryResult, setQueryResult] = useState<QueryResult>({
    isOpen: false,
    status: "success",
    description: "",
  });

  return (
    <div>
      <TopHeader
        isQueryOverlayOpen={isQueryOverlayOpen}
        setIsQueryOverlayOpen={setIsQueryOverlayOpen}
        onQueryExecute={onQueryExecute}
        setQueryResult={setQueryResult}
      />
      <main>
        <div className="px-3 py-2">
          <Tasks
            onResetDatabase={onResetDatabase}
            setIsQueryOverlayOpen={setIsQueryOverlayOpen}
          />
        </div>
      </main>
      <QueryResultOverlay
        queryResult={queryResult}
        setQueryResult={setQueryResult}
      />
    </div>
  );
};
