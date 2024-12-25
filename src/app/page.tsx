import Link from "next/link";

import { api, HydrateClient } from "@/trpc/server";
import { Todos } from "@/lib/schemas";
import TodoTable from "@/components/todo-table/table";
import TodoContainer from "@/components/todo-table/container";

async function getTodos(): Promise<Todos> {
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
          <TodoContainer initialTodos={todos} />
        </div>
      </main>
    </HydrateClient>
  );
}
