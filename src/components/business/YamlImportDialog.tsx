import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useYamlImport } from "@/hooks/useYamlImport";
import {
  Upload,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface YamlImportDialogProps {
  trigger?: React.ReactNode;
  className?: string;
}

export const YamlImportDialog = ({
  trigger,
  className,
}: YamlImportDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [yamlContent, setYamlContent] = useState("");
  const [showResults, setShowResults] = useState(false);

  const { progress, isImporting, importFromYaml, resetProgress } =
    useYamlImport();

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const content = await file.text();
      setYamlContent(content);
    } catch (error) {
      console.error("Error reading file:", error);
    }
  };

  const handleTextImport = async () => {
    if (!yamlContent.trim()) return;

    setShowResults(false);
    resetProgress();
    const result = await importFromYaml(yamlContent);
    setShowResults(true);
  };

  const resetDialog = () => {
    setYamlContent("");
    setShowResults(false);
    resetProgress();
  };

  const successCount = progress.results.filter((r) => r.success).length;
  const errorCount = progress.results.filter((r) => !r.success).length;
  const progressPercentage =
    progress.total > 0
      ? Math.round((progress.completed / progress.total) * 100)
      : 0;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          resetDialog();
        }
      }}
    >
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className={className}>
            <Upload className="mr-2 h-4 w-4" />
            Import YAML
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Import Resources from YAML</DialogTitle>
          <DialogDescription>
            Import multiple resources from a YAML file. Supports
            Kubernetes-style resource definitions.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          {!showResults ? (
            <div className="space-y-6">
              {/* File Upload Section */}
              <div className="space-y-3">
                <Label htmlFor="file-upload" className="text-base font-medium">
                  Upload YAML File
                </Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".yaml,.yml"
                    onChange={handleFileSelect}
                    className="flex-1"
                  />
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>

              {/* Text Input Section */}
              <div className="space-y-3">
                <Label htmlFor="yaml-text" className="text-base font-medium">
                  Paste YAML Content
                </Label>
                <Textarea
                  id="yaml-text"
                  placeholder={"Paste your YAML content here..."}
                  value={yamlContent}
                  onChange={(e) => setYamlContent(e.target.value)}
                  className="min-h-[300px] font-mono text-sm"
                />
              </div>

              {/* Import Progress */}
              {isImporting && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Importing resources...
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {progress.completed} / {progress.total}
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="w-full" />
                </div>
              )}

              {/* Action Button */}
              <div className="flex justify-end">
                <Button
                  onClick={handleTextImport}
                  disabled={!yamlContent.trim() || isImporting}
                  size="lg"
                >
                  {isImporting ? "Importing..." : "Import Resources"}
                </Button>
              </div>
            </div>
          ) : (
            /* Results Section */
            <div className="space-y-4 h-full flex flex-col">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Import Results</h3>
                <div className="flex gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    <CheckCircle className="mr-1 h-3 w-3" />
                    {successCount} Success
                  </Badge>
                  {errorCount > 0 && (
                    <Badge
                      variant="secondary"
                      className="bg-red-100 text-red-800"
                    >
                      <XCircle className="mr-1 h-3 w-3" />
                      {errorCount} Error
                    </Badge>
                  )}
                </div>
              </div>

              <ScrollArea className="flex-1 border rounded-md">
                <div className="p-4 space-y-3">
                  {progress.results.map((result, index: number) => (
                    <div
                      key={index}
                      className={cn(
                        "p-3 rounded-lg border",
                        result.success
                          ? "bg-green-50 border-green-200"
                          : "bg-red-50 border-red-200",
                      )}
                    >
                      <div className="flex items-start gap-3">
                        {result.success ? (
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 text-secondary">
                            <span className="font-medium">
                              {result.resourceType}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {result.resourceName}
                            </span>
                          </div>
                          {!result.success && result.error && (
                            <div className="text-sm text-red-700 mt-1">
                              <strong>Error:</strong> {result.error}
                            </div>
                          )}
                          {result.success && (
                            <div className="text-sm text-green-700">
                              Successfully created
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="flex justify-between">
                <Button variant="outline" onClick={resetDialog}>
                  Import More
                </Button>
                <Button onClick={() => setIsOpen(false)}>Close</Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
