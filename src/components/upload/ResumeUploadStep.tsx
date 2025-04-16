
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";
import { FileUploader } from "../FileUploader";

interface ResumeUploadStepProps {
  resumeFile: File | null;
  onResumeUpload: (file: File) => void;
  onNextStep: () => void;
}

export const ResumeUploadStep = ({
  resumeFile,
  onResumeUpload,
  onNextStep,
}: ResumeUploadStepProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-2">Upload Your Resume</h2>
      <p className="text-muted-foreground mb-4">
        We'll use this to highlight your strengths and tailor every part of the interview guide to your experience.
      </p>
      <FileUploader
        id="resumeUpload"
        onFileSelected={onResumeUpload}
        maxSizeMB={5}
        acceptedFileTypes={[
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ]}
      />
      {resumeFile && (
        <div className="mt-2 flex items-center text-sm text-muted-foreground">
          <FileText className="h-4 w-4 mr-1" />
          {resumeFile.name}
        </div>
      )}
      <div className="flex justify-end mt-4">
        <Button onClick={onNextStep} disabled={!resumeFile}>
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
