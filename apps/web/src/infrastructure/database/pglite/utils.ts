import { useCallback } from "react";
import { Results } from "@electric-sql/pglite";
import {
  DatabaseNotInitializedError,
  err,
  fromPromise,
  Result,
  SystemError,
  toSystemError,
} from "@/core/result";
import { usePgliteDatabaseContext } from "@/components/providers/pglite-database-provider";
import { deleteDatabaseAsync } from "@/utils/indexed-db";

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
