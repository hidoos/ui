import type { Table } from "@tanstack/react-table";
import type { ReactNode } from "react";

import { DataTableViewOptions } from "./table-view-options-dropdown";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filters?: ReactNode;
}

export function DataTableToolbar<TData>({
  table,
  filters,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">{filters}</div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
