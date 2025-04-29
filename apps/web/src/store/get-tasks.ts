import { useQuery } from "@tanstack/react-query";
import { usePgliteQueryWithInput } from "@/hooks/use-pglite-query-with-input";
import {
  getTasksPglite,
  GetTasksQueryInput,
} from "@/infrastructure/queries/get-tasks";

export const useGetTasks = (query: GetTasksQueryInput = undefined) => {
  const getTasks = usePgliteQueryWithInput(getTasksPglite);

  return useQuery({
    queryKey: ["get-tasks", query],
    queryFn: async () => (await getTasks(query))._unsafeUnwrap(),
  });
};
