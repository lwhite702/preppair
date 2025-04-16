
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadFormData } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";
import { ResumeUploadStep } from "./upload/ResumeUploadStep";
import { JobDetailsStep } from "./upload/JobDetailsStep";
import { CustomizeGuideStep } from "./upload/CustomizeGuideStep";
import { FinalizeGuideStep } from "./upload/FinalizeGuideStep";
import { ProgressIndicator } from "./upload/ProgressIndicator";
import AnonymousLimit from "./upload/AnonymousLimit";
import { useAnonymousGuides } from "@/hooks/useAnonymousGuides";
import { useGuideGeneration } from "@/hooks/useGuideGeneration";

interface UploadFormProps {
  onGuideGenerated: (markdownContent: string) => void;
}

const UploadForm = ({ onGuideGenerated }: UploadFormProps) => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<UploadFormData>({
    jobDescription: "",
    jobTitle: "",
    company: "",
  });
  const [tone, setTone] = useState<string>("professional");
  const [interviewFormat, setInterviewFormat] = useState<"virtual" | "phone" | "in-person">("virtual");

  // Custom hooks
  const { 
    anonymousGuideCount, 
    sessionId, 
    incrementGuideCount,
    isAnonymousLimitReached 
  } = useAnonymousGuides(!!user);
  
  const { 
    isGenerating, 
    generateGuide 
  } = useGuideGeneration({
    sessionId,
    incrementGuideCount,
    onGuideGenerated
  });

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Resume upload handler
  const handleResumeUpload = (file: File) => {
    setResumeFile(file);
    setCurrentStep(2);
  };

  // Interview format change handler with type safety
  const handleInterviewFormatChange = (value: string) => {
    if (value === "virtual" || value === "phone" || value === "in-person") {
      setInterviewFormat(value);
    }
  };

  // Navigation between steps
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Submit form and generate guide
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generateGuide(formData, resumeFile, tone, interviewFormat);
  };

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ResumeUploadStep 
            resumeFile={resumeFile} 
            onResumeUpload={handleResumeUpload} 
            onNextStep={nextStep} 
          />
        );
      case 2:
        return (
          <JobDetailsStep 
            formData={formData} 
            onInputChange={handleInputChange}
            onPrevStep={prevStep}
            onNextStep={nextStep}
          />
        );
      case 3:
        return (
          <CustomizeGuideStep 
            tone={tone}
            interviewFormat={interviewFormat}
            onToneChange={setTone}
            onInterviewFormatChange={handleInterviewFormatChange}
            onPrevStep={prevStep}
            onNextStep={nextStep}
          />
        );
      case 4:
        return (
          <FinalizeGuideStep 
            formData={formData}
            resumeFile={resumeFile}
            tone={tone}
            interviewFormat={interviewFormat}
            isGenerating={isGenerating}
            isAnonymousLimitReached={isAnonymousLimitReached}
            onInputChange={handleInputChange}
            onPrevStep={prevStep}
            onGenerateGuide={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Create Your Interview Guide</CardTitle>
        <CardDescription>
          Upload your resume and provide job details to generate a personalized interview guide.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!user && anonymousGuideCount >= 1 && <AnonymousLimit />}
        
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <ProgressIndicator currentStep={currentStep} totalSteps={4} />
          {renderStep()}
        </form>
      </CardContent>
    </Card>
  );
};

export default UploadForm;
