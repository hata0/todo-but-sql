"use client";

import { makePGliteProvider } from "@electric-sql/pglite-react";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { DB, initializeDb, PG, PGliteWithLive } from "@/db/db";

const { PGliteProvider: PGliteProviderPrimitive, usePGlite } =
  makePGliteProvider<PGliteWithLive>();
export { usePGlite };

type ContextProps =
  | {
      isLoading: true;
      db?: undefined;
      pg?: undefined;
    }
  | {
      isLoading: false;
      db: DB;
      pg: PG;
    };
const LocalDbContext = createContext<ContextProps | null>(null);
export const useLocalDbContext = () => {
  const context = useContext(LocalDbContext);

  if (!context) {
    throw new Error(
      "useLocalDbContext must be used within a <LocalDbProvider />",
    );
  }

  return context;
};

export const LocalDbProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<ContextProps>({ isLoading: true });

  useEffect(() => {
    (async () => {
      // dbの変更を検知できるようにする拡張を追加
      const { db, pg } = await initializeDb();

      setState({ isLoading: false, db, pg });
    })();
  }, []);

  return (
    <LocalDbContext.Provider value={state}>
      <PGliteProviderPrimitive
        db={state.pg as unknown as PGliteWithLive | undefined}
      >
        {children}
      </PGliteProviderPrimitive>
    </LocalDbContext.Provider>
  );
};
