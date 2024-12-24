import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const todoRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const todos = await ctx.db.todo.findMany();

    return todos ?? [];
  }),
});
