"use client";

import { ArrowRight, Database } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryInput } from "../../types/task";
import { queryInputSchema } from "../../schema";
import { QueryForm } from "./query-form";
import { Props as QueryFormProps } from "./query-form";
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
  SheetTrigger,
} from "@/components/shadcn-ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";

export type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
} & Pick<QueryFormProps, "onQueryExecute">;
export const QueryOverlay = ({ onQueryExecute, isOpen, setIsOpen }: Props) => {
  const form = useForm<QueryInput>({
    resolver: zodResolver(queryInputSchema),
    defaultValues: {
      query: "",
    },
  });
  const isMobile = !useMediaQuery("(min-width: 640px)");

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:animate-hover-jiggle"
        >
          <Database />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={isMobile ? "rounded-t-xl" : ""}
      >
        <ScrollArea className="w-full overflow-auto">
          <SheetHeader className="text-left">
            <SheetTitle>Write SQL</SheetTitle>
            <SheetDescription>Write PostgreSQL query here.</SheetDescription>
          </SheetHeader>
          <QueryForm
            form={form}
            onQueryExecute={async (values) => {
              setIsOpen(false);
              return await onQueryExecute(values);
            }}
            className="px-4"
          />
          <SheetFooter className="pt-2">
            <SheetClose asChild>
              <Button variant="outline" rightIcon={<ArrowRight />}>
                Cancel
              </Button>
            </SheetClose>
          </SheetFooter>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
