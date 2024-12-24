import Link from "next/link";

import { api, HydrateClient } from "@/trpc/server";
import { type TodoSchema } from "@/lib/schemas";
import TodoTable from "@/components/todo-table/table";

async function getTodos(): Promise<TodoSchema[]> {
  const todos = await api.todo.getAll();

  return todos;
}

export default async function Home() {
  const todos = await getTodos();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center space-y-5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Todos</h2>
        </div>
        <div>
          <TodoTable todos={todos} />
        </div>
      </main>
    </HydrateClient>
  );
}
