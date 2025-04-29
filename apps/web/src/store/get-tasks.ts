import { useSuspenseQuery } from "@tanstack/react-query";
import { usePgliteQueryWithInput } from "@/hooks/use-pglite-query-with-input";
import {
  getTasksPglite,
  GetTasksQueryInput,
} from "@/infrastructure/queries/get-tasks";

export const getQueryKey = (query: GetTasksQueryInput) => ["get-tasks", query];

export const useGetTasksSuspense = (query: GetTasksQueryInput = undefined) => {
  const getTasks = usePgliteQueryWithInput(getTasksPglite);

  return useSuspenseQuery({
    queryKey: getQueryKey(query),
    queryFn: async () => (await getTasks(query))._unsafeUnwrap(),
  });
};
