import fs from "node:fs/promises";
import { readMigrationFiles } from "drizzle-orm/migrator";

// pnpm db:generateでここが実行
(async () => {
  // クライアントサイド（ブラウザ）では、Node.jsのAPIは利用できない
  // node:cryptoなどが使えないため、"drizzle-orm/pglite/migrator"は直接は使えない
  // だからあらかじめreadMigrationFilesの処理を実行しておく
  // ライブラリのソースの該当箇所
  // https://github.com/drizzle-team/drizzle-orm/blob/main/drizzle-orm/src/pglite/migrator.ts
  // https://github.com/drizzle-team/drizzle-orm/blob/main/drizzle-orm/src/migrator.ts
  // 参考
  // https://github.com/drizzle-team/drizzle-orm/discussions/2532
  // JSON.stringifyの2,3引数について
  // null: すべてのプロパティを変換する（デフォルトの動作）
  // 0: インデントなし（出力を圧縮）
  const content = JSON.stringify(
    readMigrationFiles({
      migrationsFolder: "./src/db/migrations",
    }),
    null,
    0,
  );

  await fs.writeFile("src/db/migrations.json", content, {
    flag: "w",
  });

  console.log("Migrations compiled!");
})();
