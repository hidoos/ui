import { useForm } from "@refinedev/react-hook-form";
import { useTranslation } from "@refinedev/core";
import { Field } from "@/components/theme";
import type { Workspace } from "@/types";
import FormCardGrid from "@/components/business/FormCardGrid";
import { Input } from "@/components/ui/input";

export const useWorkspaceForm = ({ action }: { action: "create" | "edit" }) => {
  const isEdit = action === "edit";
  const { translate } = useTranslation();

  const form = useForm<Workspace>({
    mode: "all",
    defaultValues: {
      api_version: "v1",
      kind: "Workspace",
      metadata: {
        name: "",
      },
    },
    refineCoreProps: {
      autoSave: {
        enabled: true,
      },
    },
    warnWhenUnsavedChanges: true,
  });

  return {
    form,
    metadataFields: (
      <FormCardGrid title={translate("workspaces.fields.basicInformation")}>
        <Field
          {...form}
          name="metadata.name"
          label={translate("workspaces.fields.name")}
        >
          <Input
            placeholder={translate("workspaces.placeholders.workspaceName")}
            disabled={isEdit}
          />
        </Field>
      </FormCardGrid>
    ),
  };
};
