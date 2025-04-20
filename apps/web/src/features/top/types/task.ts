import { z } from "zod";
import { queryInputSchema } from "../schema";

export type Task = {
  id: number;
  title: string;
  isCompleted: boolean;
};

export type QueryInput = z.infer<typeof queryInputSchema>;
