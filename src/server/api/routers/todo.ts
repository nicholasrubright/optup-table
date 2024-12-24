import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { createTodoSchema, todoSchema } from "@/lib/schemas";

export const todoRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const todos = await ctx.db.todo.findMany();

    return todos ?? [];
  }),
  create: publicProcedure
    .input(createTodoSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.todo.create({
        data: input,
      });
    }),
});
