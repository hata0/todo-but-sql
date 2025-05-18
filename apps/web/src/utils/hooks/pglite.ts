import { useCallback } from "react";
import { Results } from "@electric-sql/pglite";
import {
  AppError,
  DatabaseNotInitializedError,
  err,
  fromPromise,
  Result,
  SystemError,
  toSystemError,
} from "@/core/result";
import { usePgliteDatabaseContext } from "@/components/providers/pglite-database-provider";
import { deleteDatabaseAsync } from "@/utils/indexed-db";
import { PgliteQuery } from "@/infrastructure/types";

export const usePgliteQueryWithInput = <T, U>(
  queryFn: PgliteQuery<(input: T) => Promise<Result<U, AppError>>>,
): ((input: T) => Promise<Result<U, AppError>>) => {
  const { client } = usePgliteDatabaseContext();

  return useCallback(
    async (input) => {
      if (!client) {
        return err(new DatabaseNotInitializedError());
      }

      return await queryFn(client)(input);
    },
    [client, queryFn],
  );
};

export const useExecutePgliteQuery = () => {
  const { pg } = usePgliteDatabaseContext();

  return useCallback(
    async (
      query: string,
    ): Promise<Result<Results, DatabaseNotInitializedError | SystemError>> => {
      if (!pg) {
        return err(new DatabaseNotInitializedError());
      }

      return fromPromise(pg.query(query), toSystemError);
    },
    [pg],
  );
};

export const useDeletePgliteDatabase = () => {
  const { pg } = usePgliteDatabaseContext();

  return useCallback(async () => {
    if (!pg) {
      return new DatabaseNotInitializedError();
    }

    // pg?.close()しておかないと、onblockedで弾かれる
    await pg?.close();

    return await deleteDatabaseAsync("/pglite/todo-but-sql");
  }, [pg]);
};
