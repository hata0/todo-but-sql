import { useQuery } from "@tanstack/react-query";
import { usePgliteQueryWithInput } from "@/hooks/use-pglite-query-with-input";
import {
  getTasksPglite,
  GetTasksQueryInput,
} from "@/infrastructure/queries/get-tasks";
import { DatabaseNotInitializedError, unwrap } from "@/core/result";

export const getQueryKey = (query: GetTasksQueryInput) => ["get-tasks", query];

export const useGetTasks = (query: GetTasksQueryInput = undefined) => {
  const getTasks = usePgliteQueryWithInput(getTasksPglite);

  return useQuery({
    queryKey: getQueryKey(query),
    queryFn: async () => unwrap(await getTasks(query)),
    retry: (_, e) => e instanceof DatabaseNotInitializedError,
  });
};
