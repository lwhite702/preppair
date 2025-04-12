
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUploader } from "./FileUploader";
import { generateInterviewGuide } from "@/lib/openai";
import { UploadFormData } from "@/lib/types";
import { ArrowRight, FileText, Loader2 } from "lucide-react";

interface UploadFormProps {
  onGuideGenerated: (markdownContent: string) => void;
}

const UploadForm = ({ onGuideGenerated }: UploadFormProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState<UploadFormData>({
    jobDescription: "",
    jobTitle: "",
    company: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResumeUpload = (file: File) => {
    setResumeFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.jobDescription || !formData.jobTitle || !formData.company) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      // In a real application, we would extract text from the resume file
      // For this demo, we'll simulate that part
      let resumeText = "";
      
      if (resumeFile) {
        // Simulate text extraction from resume
        resumeText = `Simulated resume content for ${resumeFile.name}`;
      }

      const response = await generateInterviewGuide({
        resumeText,
        jobDescription: formData.jobDescription,
        candidateName: formData.candidateName,
        jobTitle: formData.jobTitle,
        company: formData.company,
        additionalInfo: formData.additionalInfo,
      });

      if (response.error) {
        throw new Error(response.error);
      }

      onGuideGenerated(response.content);
      
      toast({
        title: "Success!",
        description: "Your interview guide has been created.",
      });

    } catch (error) {
      console.error("Error generating guide:", error);
      toast({
        title: "Generation failed",
        description: "There was a problem creating your guide. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="resumeUpload">Resume (PDF or DOCX)</Label>
              <FileUploader
                id="resumeUpload"
                onFileSelected={handleResumeUpload}
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
            </div>

            <div>
              <Label htmlFor="candidateName">Your Name (Optional)</Label>
              <Input
                id="candidateName"
                name="candidateName"
                placeholder="Enter your name"
                value={formData.candidateName || ""}
                onChange={handleInputChange}
              />
            </div>

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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="additionalInfo">
                Additional Information (Optional)
              </Label>
              <Textarea
                id="additionalInfo"
                name="additionalInfo"
                placeholder="Any other details you'd like to include..."
                rows={3}
                value={formData.additionalInfo || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Guide...
              </>
            ) : (
              <>
                Create Interview Guide <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UploadForm;
