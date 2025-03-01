"use client";

import { usersTable } from "@/db/schema";
import { useLocalDbContext } from "@/providers/local-db-provider";
import { useEffect } from "react";

export default function TopPage() {
  const { isLoading, db } = useLocalDbContext();

  useEffect(() => {
    (async () => {
      if (!isLoading) {
        console.log(await db.select().from(usersTable));
      }
    })();
  }, [db, isLoading]);

  return (
    <div>
      <main>
        <div>hello</div>
      </main>
    </div>
  );
}
