"use client";

import { type Table } from "@tanstack/react-table";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCallback, useRef, useState } from "react";
import { api } from "@/trpc/react";
import type { Todo, Todos, CreateTodoInput } from "@/lib/schemas";

interface TodoTableToolbarProps {
  table: Table<Todo>;
}

export default function TodoTableToolbar({ table }: TodoTableToolbarProps) {
  const [todo, setTodo] = useState<string>("");
  const optCounter = useRef(-1);

  const utils = api.useUtils();

  const createTodo = api.todo.create.useMutation({
    onMutate: async (newTodo: CreateTodoInput) => {
      await utils.todo.getAll.cancel();

      const prevTodos = utils.todo.getAll.getData();

      const optId = optCounter.current--;

      utils.todo.getAll.setData(undefined, (old: Todos | undefined) => {
        const optTodo: Todo = {
          id: optId,
          name: newTodo.name,
          completed: false,
          createdAt: new Date(),
        };

        return old ? [...old, optTodo] : [optTodo];
      });

      return { prevTodos };
    },
    onError: (err, newTodo, context) => {
      utils.todo.getAll.setData(undefined, context?.prevTodos);
    },
    onSuccess: async () => {
      setTodo("");
    },
    onSettled: async () => {
      await utils.todo.getAll.invalidate();
    },
  });

  const addTodo = useCallback(
    async (name: string) => {
      await createTodo.mutateAsync({ name });
    },
    [createTodo],
  );

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
          onClick={() => addTodo(todo)}
          type="submit"
        >
          {createTodo.isPending ? "+ Adding..." : "+ Add"}
        </Button>
      </div>
    </div>
  );
}
