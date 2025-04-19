import { z } from "zod";

export const queryInputSchema = z.object({
  query: z.string().min(1, "Query is required"),
});
