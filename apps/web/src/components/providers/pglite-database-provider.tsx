"use client";

import { makePGliteProvider } from "@electric-sql/pglite-react";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Client,
  initializeClient,
  PG,
  PGliteWithLive,
} from "@/infrastructure/database/pglite";

const { PGliteProvider: PGliteProviderPrimitive, usePGlite } =
  makePGliteProvider<PGliteWithLive>();
export { usePGlite };

type ContextProps = { client?: Client; pg?: PG };
const PgliteDatabaseContext = createContext<ContextProps | null>(null);
export const usePgliteDatabaseContext = () => {
  const context = useContext(PgliteDatabaseContext);

  if (context === null) {
    throw new Error(
      "useLocalDbContext must be used within a <LocalDbProvider />",
    );
  }

  return context;
};

export const PgliteDatabaseProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<ContextProps>({});

  useEffect(() => {
    (async () => {
      // dbの変更を検知できるようにする拡張を追加
      const { client, pg } = await initializeClient();

      setState({ client, pg });
    })();
  }, []);

  return (
    <PgliteDatabaseContext.Provider value={state}>
      <PGliteProviderPrimitive
        db={state?.pg as unknown as PGliteWithLive | undefined}
      >
        {children}
      </PGliteProviderPrimitive>
    </PgliteDatabaseContext.Provider>
  );
};
