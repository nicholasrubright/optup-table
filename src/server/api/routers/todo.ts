import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { createTodoSchema, todoSchema, todosSchema } from "@/lib/schemas";

export const todoRouter = createTRPCRouter({
  getAll: publicProcedure.output(todosSchema).query(async ({ ctx }) => {
    const todos = await ctx.db.todo.findMany({
      orderBy: { createdAt: "asc" },
    });

    return todos ?? [];
  }),
  create: publicProcedure
    .input(createTodoSchema)
    .output(todoSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.todo.create({
        data: input,
      });
    }),
});
