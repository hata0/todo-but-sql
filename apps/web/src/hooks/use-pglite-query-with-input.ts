import { useCallback } from "react";
import { AppError, Result } from "@/core/result";
import { ClientWithQueryInput } from "@/infrastructure/types";
import { useLocalDbContext } from "@/providers/local-db-provider";
import { waitUntil } from "@/utils/delay";

type QueryFn<TInput, TSuccess, TError extends AppError> = (
  props: ClientWithQueryInput<TInput>,
) => Promise<Result<TSuccess, TError>>;
type QueryFnWithoutClient<TInput, TSuccess, TError extends AppError> = (
  input: ClientWithQueryInput<TInput>["input"],
) => Promise<Result<TSuccess, TError>>;

export const usePgliteQueryWithInput = <
  TInput,
  TSuccess,
  TError extends AppError,
>(
  queryFn: QueryFn<TInput, TSuccess, TError>,
): QueryFnWithoutClient<TInput, TSuccess, TError> => {
  const { client } = useLocalDbContext();

  return useCallback(
    async (input) => {
      await waitUntil(() => !!client, Infinity);

      return await queryFn({ input, client: client! });
    },
    [client, queryFn],
  );
};
