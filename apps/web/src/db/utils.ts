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
import { useLocalDbContext } from "@/providers/local-db-provider";
import { deleteDatabaseAsync } from "@/utils/indexed-db";

export const useExecuteQuery = () => {
  const { pg } = useLocalDbContext();

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

export const useDeleteDatabase = () => {
  const { pg } = useLocalDbContext();

  return useCallback(async () => {
    if (!pg) {
      return new DatabaseNotInitializedError();
    }

    // pg?.close()しておかないと、onblockedで弾かれる
    await pg?.close();

    return await deleteDatabaseAsync("/pglite/test");
  }, [pg]);
};
