"use client";

import { Database } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryInput } from "../../types/task";
import { queryInputSchema } from "../../schema";
import { QueryForm } from "./query-form";
import { Props as QueryFormProps } from "./query-form";
import { Button } from "@/components/shadcn-ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/shadcn-ui/drawer";

export type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
} & Pick<QueryFormProps, "onQueryExecute">;
export const QueryDrawer = ({ onQueryExecute, isOpen, setIsOpen }: Props) => {
  const form = useForm<QueryInput>({
    resolver: zodResolver(queryInputSchema),
    defaultValues: {
      query: "",
    },
  });

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:animate-hover-jiggle cursor-pointer"
        >
          <Database />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Write SQL</DrawerTitle>
          <DrawerDescription>Write PostgreSQL query here.</DrawerDescription>
        </DrawerHeader>
        <QueryForm
          form={form}
          onQueryExecute={async (values) => {
            setIsOpen(false);
            await onQueryExecute(values);
          }}
          className="px-4"
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
