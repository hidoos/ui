import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { YamlImportDialog } from "./YamlImportDialog";
import { useTranslation } from "react-i18next";

export const YamlImportButton = () => {
  const { t } = useTranslation();

  return (
    <YamlImportDialog
      trigger={
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          {t("components.yamlImport.importYaml")}
        </Button>
      }
    />
  );
};
