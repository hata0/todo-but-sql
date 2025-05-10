"use client";

import { useQueryClient } from "@tanstack/react-query";
import { tabToQuery, useTabQueryState } from "../../utils/tab";
import { Top as Presenter } from "./top";
import { err, ok } from "@/core/result";
import {
  useDeleteDatabase,
  useExecuteQuery,
} from "@/infrastructure/database/utils";
import { getQueryKey } from "@/store/get-tasks";

export const Top = () => {
  const executeQuery = useExecuteQuery();
  const deleteDatabase = useDeleteDatabase();
  const client = useQueryClient();
  const [tab] = useTabQueryState();

  return (
    <Presenter
      onResetDatabase={async () => {
        return await deleteDatabase();
      }}
      onQueryExecute={async ({ query }) => {
        return (await executeQuery(query)).match(
          async (result) => {
            client.invalidateQueries({
              queryKey: getQueryKey(tabToQuery(tab)),
            });

            return ok(JSON.stringify(result, null, 2));
          },
          (e) => {
            return err(e);
          },
        );
      }}
    />
  );
};
