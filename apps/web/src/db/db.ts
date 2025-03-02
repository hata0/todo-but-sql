import { PGlite, PGliteInterfaceExtensions } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { PGliteWorker } from "@electric-sql/pglite/worker";
import { live } from "@electric-sql/pglite/live";
import migrations from "./migrations.json";

export type PGliteWithLive = PGlite &
  PGliteInterfaceExtensions<{ live: typeof live }>;
export type PG = Awaited<ReturnType<typeof initializeDb>>["pg"];
// 非同期型の取得はAwaitedを使う
export type DB = Awaited<ReturnType<typeof initializeDb>>["db"];

export const initializeDb = async () => {
  // PGliteは単一の接続のみであるため、複数のブラウザータブを単一のPGliteインスタンスにプロキシする必要がある場合があるのでWorkerを使う
  const pg = await PGliteWorker.create(
    new Worker(new URL("./pglite.worker.ts", import.meta.url), {
      // ESモジュールを使うならこう
      type: "module",
    }),
    {
      extensions: {
        live,
      },
    },
  );
  const db = drizzle(pg as unknown as PGliteWithLive);

  // https://github.com/drizzle-team/drizzle-orm/blob/main/drizzle-orm/src/pglite/migrator.ts
  // https://github.com/drizzle-team/drizzle-orm/blob/main/drizzle-orm/src/pg-core/dialect.ts
  // ここを見るにsqlが少し調整されているっぽい？
  // dialectとsession存在しないように見えるが存在する
  // 第３引数はstring | MigrationConfigらしいのでこう
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (db as any).dialect.migrate(migrations, (db as any).session, {});

  return { db, pg };
};
