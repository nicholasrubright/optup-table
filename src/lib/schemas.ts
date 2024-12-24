import { z } from "zod";

export const todoSchema = z.object({
  id: z.number(),
  name: z.string(),
  completed: z.boolean(),
});

export const createTodoSchema = z.object({
  name: z.string(),
});

export type TodoSchema = z.infer<typeof todoSchema>;
export type CreateTodoSchema = z.infer<typeof createTodoSchema>;

