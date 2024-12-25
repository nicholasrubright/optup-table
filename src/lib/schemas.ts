import { z } from "zod";

export const todoSchema = z.object({
  id: z.number(),
  name: z.string(),
  completed: z.boolean(),
  createdAt: z.date(),
});

export const createTodoSchema = z.object({
  name: z.string().min(1),
});

export const todosSchema = z.array(todoSchema);

export type Todo = z.infer<typeof todoSchema>;
export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type Todos = z.infer<typeof todosSchema>;
