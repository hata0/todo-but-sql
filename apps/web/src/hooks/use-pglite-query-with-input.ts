import { useCallback } from "react";
import {
  AppError,
  DatabaseNotInitializedError,
  err,
  Result,
} from "@/core/result";
import { ClientWithQueryInput } from "@/infrastructure/types";
import { useLocalDbContext } from "@/providers/local-db-provider";

type QueryFn<TInput, TSuccess, TError extends AppError> = (
  props: ClientWithQueryInput<TInput>,
) => Promise<Result<TSuccess, TError>>;
type QueryFnWithoutClient<TInput, TSuccess, TError extends AppError> = (
  input: ClientWithQueryInput<TInput>["input"],
) => Promise<Result<TSuccess, TError | DatabaseNotInitializedError>>;

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
      if (!client) {
        return err(new DatabaseNotInitializedError());
      }

      return await queryFn({ input, client });
    },
    [client, queryFn],
  );
};
