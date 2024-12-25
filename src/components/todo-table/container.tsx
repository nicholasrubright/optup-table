"use client";

import { initializeTodosAtom } from "@/atoms/todoAtoms";
import { Todos } from "@/lib/schemas";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import TodoTable from "./table";
import TodoTableToolbar from "./toolbar";

interface TodoContainerProps {
  initialTodos: Todos;
}

export default function TodoContainer({ initialTodos }: TodoContainerProps) {
  const initializeTodos = useSetAtom(initializeTodosAtom);

  useEffect(() => {
    initializeTodos(initialTodos);
  }, [initialTodos, initializeTodos]);

  return (
    <div className="space-y-4">
      <TodoTable />
      <TodoTableToolbar />
    </div>
  );
}
