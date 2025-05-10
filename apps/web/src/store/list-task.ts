import { useQuery } from "@tanstack/react-query";
import { usePgliteQueryWithInput } from "@/utils/hooks/use-pglite-query-with-input";
import {
  listTaskPglite,
  ListTaskInput,
} from "@/infrastructure/queries/list-task-pglite";
import { DatabaseNotInitializedError, unwrap } from "@/core/result";

export const getQueryKey = (query: ListTaskInput) => ["list-task", query];

export const useListTask = (query: ListTaskInput = undefined) => {
  const listTask = usePgliteQueryWithInput(listTaskPglite);

  return useQuery({
    queryKey: getQueryKey(query),
    queryFn: async () => unwrap(await listTask(query)),
    retry: (_, e) => e instanceof DatabaseNotInitializedError,
  });
};
