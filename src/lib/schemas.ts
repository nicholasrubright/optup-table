import { z } from "zod";

export const todoSchema = z.object({
  id: z.number(),
  name: z.string(),
  completed: z.boolean(),
});

export type TodoSchema = z.infer<typeof todoSchema>;
