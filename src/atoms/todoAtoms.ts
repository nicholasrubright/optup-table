import { atom } from "jotai";
import type { Todos } from "@/lib/schemas";

export const todosAtom = atom<Todos>([]);
export const initializeTodosAtom = atom(
  null,
  (get, set, initialTodos: Todos) => {
    set(todosAtom, initialTodos);
  },
);
