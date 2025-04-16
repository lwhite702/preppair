
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowRight } from "lucide-react";
import { UploadFormData } from "@/lib/types";

interface FinalizeGuideStepProps {
  formData: UploadFormData;
  resumeFile: File | null;
  tone: string;
  interviewFormat: "virtual" | "phone" | "in-person";
  isGenerating: boolean;
  isAnonymousLimitReached: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onPrevStep: () => void;
  onGenerateGuide: (e: React.FormEvent) => void;
}

export const FinalizeGuideStep = ({
  formData,
  resumeFile,
  tone,
  interviewFormat,
  isGenerating,
  isAnonymousLimitReached,
  onInputChange,
  onPrevStep,
  onGenerateGuide,
}: FinalizeGuideStepProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-2">Ready? Let's Prep</h2>
      <p className="text-muted-foreground mb-4">
        Click below to generate your personalized guide, complete with questions, sample answers, and insights.
      </p>
      
      <div className="bg-muted/50 p-4 rounded-lg space-y-3">
        <div className="flex justify-between">
          <span className="font-medium">Resume:</span>
          <span>{resumeFile?.name || "Not provided"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Job:</span>
          <span>{formData.jobTitle} at {formData.company}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Tone:</span>
          <span className="capitalize">{tone === 'quick' ? 'Quick Start' : tone}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Format:</span>
          <span className="capitalize">{interviewFormat} Interview</span>
        </div>
      </div>

      <div className="mt-2">
        <Label htmlFor="candidateName">Your Name (Optional)</Label>
        <Input
          id="candidateName"
          name="candidateName"
          placeholder="Enter your name"
          value={formData.candidateName || ""}
          onChange={onInputChange}
        />
      </div>

      <div>
        <Label htmlFor="additionalInfo">
          Additional Information (Optional)
        </Label>
        <Textarea
          id="additionalInfo"
          name="additionalInfo"
          placeholder="Any specific concerns or context about this interview..."
          rows={3}
          value={formData.additionalInfo || ""}
          onChange={onInputChange}
        />
      </div>

      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={onPrevStep}>
          Back
        </Button>
        <Button 
          onClick={onGenerateGuide}
          disabled={isGenerating || isAnonymousLimitReached}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Guide...
            </>
          ) : isAnonymousLimitReached ? (
            <>
              Create an Account to Continue
            </>
          ) : (
            <>
              Generate Guide <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
