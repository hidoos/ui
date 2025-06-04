import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { YamlImportDialog } from "./YamlImportDialog";

export const YamlImportButton = () => {
  return (
    <YamlImportDialog
      trigger={
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Import YAML
        </Button>
      }
    />
  );
};
