import type { ModelCatalogPhase } from "@/types";
import { Table } from "..";
import ModelCatalogStatus from "@/components/business/ModelCatalogStatus";
import ModelTask from "@/components/business/ModelTask";
import { Trash2 } from "lucide-react";

export const useModelCatalogColumns = () => {
  return {
    model: (
      <Table.Column
        header={"Model"}
        accessorKey="spec.model.name"
        id="model"
        enableHiding
      />
    ),
    task: (
      <Table.Column
        header={"Task"}
        accessorKey="spec.model.task"
        id="task"
        enableHiding
        cell={({ row }) => {
          const { model } = row.original.spec;
          return <ModelTask task={model.task} />;
        }}
      />
    ),
    engine: (
      <Table.Column
        header={"Engine"}
        accessorKey="spec.engine.engine"
        id="engine"
        enableHiding
      />
    ),
    status: (
      <Table.Column
        header={"Status"}
        accessorKey="status.phase"
        id="status"
        enableHiding
        cell={({ getValue }) => {
          const phase = getValue() as unknown as ModelCatalogPhase;
          return <ModelCatalogStatus phase={phase} />;
        }}
      />
    ),
    action: (
      <Table.Column
        accessorKey={"id"}
        id={"actions"}
        cell={({ row: { original } }) => (
          <Table.Actions>
            <Table.DeleteAction
              title="Delete"
              row={original}
              resource="model_catalogs"
              icon={<Trash2 size={16} />}
            />
          </Table.Actions>
        )}
      />
    ),
  };
};
