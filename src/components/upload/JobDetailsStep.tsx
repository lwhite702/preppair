
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { UploadFormData } from "@/lib/types";

interface JobDetailsStepProps {
  formData: UploadFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onPrevStep: () => void;
  onNextStep: () => void;
}

export const JobDetailsStep = ({
  formData,
  onInputChange,
  onPrevStep,
  onNextStep,
}: JobDetailsStepProps) => {
  const isNextDisabled = !formData.jobTitle || !formData.company || !formData.jobDescription;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-2">Upload the Job Posting</h2>
      <p className="text-muted-foreground mb-4">
        Give us the job you're aiming for. We'll match key requirements and help you speak their language in the interview.
      </p>
      <div>
        <Label htmlFor="jobTitle" className="required">
          Job Title
        </Label>
        <Input
          id="jobTitle"
          name="jobTitle"
          placeholder="e.g., Frontend Developer"
          required
          value={formData.jobTitle}
          onChange={onInputChange}
          className="mb-4"
        />
      </div>
      <div>
        <Label htmlFor="company" className="required">
          Company
        </Label>
        <Input
          id="company"
          name="company"
          placeholder="e.g., Acme Inc."
          required
          value={formData.company}
          onChange={onInputChange}
          className="mb-4"
        />
      </div>
      <div>
        <Label htmlFor="jobDescription" className="required">
          Job Description
        </Label>
        <Textarea
          id="jobDescription"
          name="jobDescription"
          placeholder="Paste the full job description here..."
          required
          rows={6}
          value={formData.jobDescription}
          onChange={onInputChange}
        />
      </div>
      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={onPrevStep}>
          Back
        </Button>
        <Button onClick={onNextStep} disabled={isNextDisabled}>
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
