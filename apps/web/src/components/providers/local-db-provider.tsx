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
const LocalDbContext = createContext<ContextProps | null>(null);
export const useLocalDbContext = () => {
  const context = useContext(LocalDbContext);

  if (context === null) {
    throw new Error(
      "useLocalDbContext must be used within a <LocalDbProvider />",
    );
  }

  return context;
};

export const LocalDbProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<ContextProps>({});

  useEffect(() => {
    (async () => {
      // dbの変更を検知できるようにする拡張を追加
      const { client, pg } = await initializeClient();

      setState({ client, pg });
    })();
  }, []);

  return (
    <LocalDbContext.Provider value={state}>
      <PGliteProviderPrimitive
        db={state?.pg as unknown as PGliteWithLive | undefined}
      >
        {children}
      </PGliteProviderPrimitive>
    </LocalDbContext.Provider>
  );
};

export const LocalDbProviderMock = ({ children }: PropsWithChildren) => {
  return (
    <LocalDbContext.Provider value={{}}>
      <PGliteProviderPrimitive db={undefined}>
        {children}
      </PGliteProviderPrimitive>
    </LocalDbContext.Provider>
  );
};
