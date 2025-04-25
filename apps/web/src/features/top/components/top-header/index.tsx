import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { QueryOverlay } from "../query-overlay";
import { Props as QueryFormProps } from "../query-overlay/query-form";
import { QueryResult } from "../query-result-overlay";
import { ModeToggle } from "@/components/shadcn-ui/mode-toggle";
import { text } from "@/typography/text";
import { Button } from "@/components/shadcn-ui/button";

type Props = {
  isQueryOverlayOpen: boolean;
  setIsQueryOverlayOpen: Dispatch<SetStateAction<boolean>>;
  setQueryResult: Dispatch<SetStateAction<QueryResult>>;
} & Pick<QueryFormProps, "onQueryExecute">;
export const TopHeader = ({
  isQueryOverlayOpen,
  setIsQueryOverlayOpen,
  onQueryExecute,
  setQueryResult,
}: Props) => {
  return (
    <header className="z-2 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 flex h-14 items-center justify-between gap-2 border-b border-dashed px-2 backdrop-blur transition duration-500 ease-in-out">
      <Button asChild variant="ghost" size="lg">
        <Link href="/" className={text.large.className}>
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="animate-text-gradient bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent">
            Todo but SQL
          </span>
        </Link>
      </Button>
      <div className="flex items-center gap-2">
        <QueryOverlay
          isOpen={isQueryOverlayOpen}
          setIsOpen={setIsQueryOverlayOpen}
          onQueryExecute={async (values) => {
            const result = await onQueryExecute(values);
            if (result.isOk()) {
              setQueryResult({
                isOpen: true,
                status: "success",
                description: result.value,
              });
            } else {
              setQueryResult({
                isOpen: true,
                status: "error",
                description: result.error,
              });
            }
            return result;
          }}
        />
        <ModeToggle />
      </div>
    </header>
  );
};
