import { useCallback } from "react";
import {
  AppError,
  DatabaseNotInitializedError,
  err,
  Result,
} from "@/core/result";
import { ClientWithQuery } from "@/infrastructure/types";
import { useLocalDbContext } from "@/providers/local-db-provider";

type QueryFn<TQuery, TSuccess, TError extends AppError> = (
  props: ClientWithQuery<TQuery>,
) => Promise<Result<TSuccess, TError>>;
type QueryFnWithoutClient<TQuery, TSuccess, TError extends AppError> = (
  query?: TQuery,
) => Promise<Result<TSuccess, TError | DatabaseNotInitializedError>>;

export const usePgliteQuery = <TQuery, TSuccess, TError extends AppError>(
  queryFn: QueryFn<TQuery, TSuccess, TError>,
): QueryFnWithoutClient<TQuery, TSuccess, TError> => {
  const { client } = useLocalDbContext();

  return useCallback(
    async (query) => {
      if (!client) {
        return err(new DatabaseNotInitializedError());
      }

      return await queryFn({ query, client });
    },
    [client, queryFn],
  );
};
