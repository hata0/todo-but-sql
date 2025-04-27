import { z } from "zod";
import { queryInputSchema } from "../schema";

export type QueryInput = z.infer<typeof queryInputSchema>;
