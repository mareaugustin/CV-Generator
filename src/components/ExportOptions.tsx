
import { Button } from "@/components/ui/button";
import { ExportOptionsProps } from "@/types";
import { Download, FileText, Image, Loader2, FileImage } from "lucide-react";

const ExportOptions = ({ onExport, isPending }: ExportOptionsProps) => {
  return (
    <div className="resume-section">
      <h2 className="text-xl font-semibold mb-4">Exporter</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Button
          variant="outline"
          className="p-6 h-auto flex flex-col gap-2 items-center justify-center"
          onClick={() => onExport("pdf")}
          disabled={isPending}
        >
          <FileText className="h-8 w-8 text-resume-primary" />
          <span className="font-medium">PDF</span>
          <span className="text-xs text-gray-500">Format standard</span>
        </Button>
        
        <Button
          variant="outline"
          className="p-6 h-auto flex flex-col gap-2 items-center justify-center"
          onClick={() => onExport("docx")}
          disabled={isPending}
        >
          <FileText className="h-8 w-8 text-blue-500" />
          <span className="font-medium">DOCX</span>
          <span className="text-xs text-gray-500">Éditable dans Word</span>
        </Button>
        
        <Button
          variant="outline"
          className="p-6 h-auto flex flex-col gap-2 items-center justify-center"
          onClick={() => onExport("image")}
          disabled={isPending}
        >
          <FileImage className="h-8 w-8 text-green-500" />
          <span className="font-medium">Image</span>
          <span className="text-xs text-gray-500">PNG haute qualité</span>
        </Button>
      </div>
      
      {isPending && (
        <div className="mt-4 flex items-center justify-center text-gray-500">
          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
          <span>Génération en cours...</span>
        </div>
      )}
    </div>
  );
};

export default ExportOptions;
