"use client";

import { useQueryClient } from "@tanstack/react-query";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import { match } from "ts-pattern";
import { Tab, TABS_ARRAY } from "../../utils/tab";
import { Top as Presenter } from "./top";
import { err, ok } from "@/core/result";
import {
  useDeletePgliteDatabase,
  useExecutePgliteQuery,
} from "@/infrastructure/database/pglite/utils";
import { getQueryKey, useListTask } from "@/store/list-task";
import { ListTaskInput } from "@/infrastructure/queries/list-task-pglite";

const tabToQuery = (tab: Tab | null): ListTaskInput => {
  return match(tab)
    .returnType<ListTaskInput>()
    .with("uncompleted", () => ({ isCompleted: false }))
    .with("completed", () => ({ isCompleted: true }))
    .otherwise(() => undefined);
};

export const Top = () => {
  const executeQuery = useExecutePgliteQuery();
  const deleteDatabase = useDeletePgliteDatabase();
  const [tab, setTab] = useQueryState("tab", parseAsStringLiteral(TABS_ARRAY));
  const { data, error, isLoading } = useListTask(tabToQuery(tab));
  const client = useQueryClient();

  return (
    <Presenter
      currentTab={tab}
      listTask={{ data, error, isLoading }}
      onTabChange={setTab}
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
