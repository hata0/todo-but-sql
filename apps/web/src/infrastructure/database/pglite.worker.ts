import { PGlite } from "@electric-sql/pglite";
import { vector } from "@electric-sql/pglite/vector";
import { worker } from "@electric-sql/pglite/worker";

worker({
  init: async () => {
    return new PGlite({
      dataDir: "idb://todo-but-sql",
      // 高次元ベクトルの保存と検索を可能にするもの
      extensions: { vector },
    });
  },
});
