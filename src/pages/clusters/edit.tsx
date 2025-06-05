import { Form } from "@/components/theme";
import { useClusterForm } from "./use-cluster-form";
import { useTranslation } from "@/lib/i18n";

export const ClustersEdit = () => {
  const { t } = useTranslation();
  const {
    form,
    metadataFields,
    imageRegistryFields,
    providerFields,
    authFields,
  } = useClusterForm({ action: "edit" });
  return (
    <Form {...form} title={t("clusters.edit")}>
      {metadataFields}
      {imageRegistryFields}
      {providerFields}
      {authFields}
    </Form>
  );
};
