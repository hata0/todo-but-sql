"use client";

import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { QueryForm, QueryInput, queryInputSchema } from "./query-form";
import { Button } from "@/components/shadcn-ui/button";
import { ScrollArea } from "@/components/shadcn-ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/shadcn-ui/sheet";
import { useMediaQuery } from "@/utils/hooks/use-media-query";
import { AppError, Result } from "@/core/result";

export type QueryOverlayProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onQueryExecute: (values: QueryInput) => Promise<Result<string, AppError>>;
};
export const QueryOverlay = ({
  isOpen,
  onOpenChange,
  onQueryExecute,
}: QueryOverlayProps) => {
  const t = useTranslations("TopPage.QueryOverlay");

  const form = useForm<QueryInput>({
    resolver: zodResolver(queryInputSchema),
    defaultValues: {
      query: "",
    },
  });
  const isMobile = !useMediaQuery("(min-width: 640px)");

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={isMobile ? "rounded-t-xl" : ""}
      >
        <ScrollArea className="w-full overflow-auto">
          <SheetHeader className="text-left">
            <SheetTitle>{t("title")}</SheetTitle>
            <SheetDescription>{t("description")}</SheetDescription>
          </SheetHeader>
          <QueryForm
            form={form}
            onQueryExecute={async (values) => {
              onOpenChange(false);
              return await onQueryExecute(values);
            }}
            className="px-4"
          />
          <SheetFooter className="pt-2">
            <SheetClose asChild>
              <Button variant="outline" rightIcon={<ArrowRight />}>
                {t("cancel")}
              </Button>
            </SheetClose>
          </SheetFooter>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
