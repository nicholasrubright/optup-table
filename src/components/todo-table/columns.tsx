"use client";

import { type TodoSchema } from "@/lib/schemas";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";

const columnHelper = createColumnHelper<TodoSchema>();

export const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: () => <span>Name</span>,
  }),
  columnHelper.accessor("completed", {
    cell: (info) => {
      return (
        <div>
          <Checkbox checked={info.getValue()} />
        </div>
      );
    },
  }),
];
