"use client";

import { TodoSchema } from "@/lib/schemas";
import { Table } from "@tanstack/react-table";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { api } from "@/trpc/react";

interface TodoTableToolbarProps {
  table: Table<TodoSchema>;
}

export default function TodoTableToolbar({ table }: TodoTableToolbarProps) {
  const [todo, setTodo] = useState<string>("");

  const createTodo = api.todo.create.useMutation({
    onSuccess: async () => {
      setTodo("");
    },
  });

  return (
    <div className="flex items-center justify-center">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Add todo"
        />
        <Button
          disabled={createTodo.isPending}
          onClick={() => createTodo.mutate({ name: todo })}
          type="submit"
        >
          {createTodo.isPending ? "+ Adding..." : "+ Add"}
        </Button>
      </div>
    </div>
  );
}
