import { PGlite } from "@electric-sql/pglite";
import { vector } from "@electric-sql/pglite/vector";
import { worker } from "@electric-sql/pglite/worker";

worker({
  init: async () => {
    return new PGlite({
      // TODO: 後で適切に設定
      dataDir: "idb://test",
      // 高次元ベクトルの保存と検索を可能にするもの
      extensions: { vector },
    });
  },
});
