import { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/shadcn-ui/alert-dialog";

export type QueryResult = {
  isOpen: boolean;
  status: "success" | "error";
  description: string;
};

type Props = {
  queryResult: QueryResult;
  setQueryResult: Dispatch<SetStateAction<QueryResult>>;
};
export const QueryResultOverlay = ({ queryResult, setQueryResult }: Props) => {
  const t = useTranslations("TopPage.QueryResultOverlay");

  return (
    <AlertDialog
      open={queryResult.isOpen}
      onOpenChange={(isOpen) => {
        setQueryResult((prev) => ({ ...prev, isOpen }));
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle
            className={queryResult.status === "error" ? "text-destructive" : ""}
          >
            {queryResult.status === "success"
              ? t("title.success")
              : t("title.error")}
          </AlertDialogTitle>
          <AlertDialogDescription className="max-h-80 overflow-auto whitespace-pre-wrap text-start">
            {queryResult.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>{t("close")}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
