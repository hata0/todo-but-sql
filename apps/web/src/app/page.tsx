"use client";

import { useEffect } from "react";
import { usersTable } from "@/db/schema";
import { Top } from "@/features/top/components/top";
import { useLocalDbContext } from "@/providers/local-db-provider";

export default function TopPage() {
  const { isLoading, db } = useLocalDbContext();

  useEffect(() => {
    (async () => {
      if (!isLoading) {
        console.log(await db.select().from(usersTable));
      }
    })();
  }, [db, isLoading]);

  return <Top />;
}
