import { useCallback } from "react";
import {
  AppError,
  DatabaseNotInitializedError,
  err,
  Result,
} from "@/core/result";
import { PgliteDatabaseWithQueryInput } from "@/infrastructure/types";
import { usePgliteDatabaseContext } from "@/components/providers/pglite-database-provider";

type QueryFn<TInput, TSuccess, TError extends AppError> = (
  props: PgliteDatabaseWithQueryInput<TInput>,
) => Promise<Result<TSuccess, TError>>;
type QueryFnWithoutDb<TInput, TSuccess, TError extends AppError> = (
  input: PgliteDatabaseWithQueryInput<TInput>["input"],
) => Promise<Result<TSuccess, TError | DatabaseNotInitializedError>>;

export const usePgliteQueryWithInput = <
  TInput,
  TSuccess,
  TError extends AppError,
>(
  queryFn: QueryFn<TInput, TSuccess, TError>,
): QueryFnWithoutDb<TInput, TSuccess, TError> => {
  const { client } = usePgliteDatabaseContext();

  return useCallback(
    async (input) => {
      if (!client) {
        return err(new DatabaseNotInitializedError());
      }

      return await queryFn({ input, db: client });
    },
    [client, queryFn],
  );
};
