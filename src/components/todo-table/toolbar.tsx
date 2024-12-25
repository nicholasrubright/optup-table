"use client";

import { type Table } from "@tanstack/react-table";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCallback, useRef, useState } from "react";
import { api } from "@/trpc/react";
import type { Todo, Todos, CreateTodoInput } from "@/lib/schemas";
import { useAtomValue, useSetAtom } from "jotai";
import { todosAtom } from "@/atoms/todoAtoms";

export default function TodoTableToolbar() {
  const todos = useAtomValue(todosAtom);
  const setTodos = useSetAtom(todosAtom);

  const optCounter = useRef(-1);

  const [todo, setTodo] = useState<string>("");

  const utils = api.useUtils();

  const createTodo = api.todo.create.useMutation({
    onMutate: async (newTodo: CreateTodoInput) => {
      const prevTodos = todos;
      const optId = optCounter.current--;

      const optTodo: Todo = {
        id: optId,
        name: newTodo.name,
        completed: false,
        createdAt: new Date(),
      };

      setTodos((currentTodos) => [optTodo, ...currentTodos]);

      return { prevTodos };
    },
    onError: (err, newTodo, context) => {
      utils.todo.getAll.setData(undefined, context?.prevTodos);
    },
    onSuccess: (newTodo: Todo) => {
      setTodos((currentTodos) =>
        currentTodos.map((todo) => (todo.id < 0 ? newTodo : todo)),
      );
      setTodo("");
    },
    // onSettled: async () => {
    //   //await utils.todo.getAll.invalidate();
    // },
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
