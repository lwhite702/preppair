
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUploader } from "./FileUploader";
import { generateInterviewGuide } from "@/lib/openai";
import { UploadFormData } from "@/lib/types";
import { ArrowRight, FileText, Loader2, AlertTriangle, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface UploadFormProps {
  onGuideGenerated: (markdownContent: string) => void;
}

const UploadForm = ({ onGuideGenerated }: UploadFormProps) => {
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState<UploadFormData>({
    jobDescription: "",
    jobTitle: "",
    company: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [anonymousGuideCount, setAnonymousGuideCount] = useState<number>(0);
  const [sessionId, setSessionId] = useState<string>("");
  const [tone, setTone] = useState<string>("professional");
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Check for anonymous guide limit
  useEffect(() => {
    if (!user) {
      // Create or retrieve session ID from local storage
      const storedSessionId = localStorage.getItem("interviewAceSessionId");
      const newSessionId = storedSessionId || uuidv4();
      
      if (!storedSessionId) {
        localStorage.setItem("interviewAceSessionId", newSessionId);
      }
      
      setSessionId(newSessionId);
      
      // Count anonymous guides for this session
      const fetchAnonymousGuideCount = async () => {
        const { data, error, count } = await supabase
          .from("anonymous_guides")
          .select("*", { count: "exact" })
          .eq("session_id", newSessionId);
        
        if (error) {
          console.error("Error fetching anonymous guides:", error);
          return;
        }
        
        setAnonymousGuideCount(count || 0);
      };
      
      fetchAnonymousGuideCount();
    }
  }, [user]);

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
    // Move to next step after resume upload
    setCurrentStep(2);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
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

    // Check if we need to limit anonymous users
    if (!user && anonymousGuideCount >= 1) {
      toast({
        title: "Account Required",
        description: "Please create an account to generate more interview guides.",
        variant: "destructive", 
      });
      navigate("/auth");
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
        tone,
      });

      if (response.error) {
        throw new Error(response.error);
      }

      const guideContent = response.content;
      
      // Generate a title for the guide
      const title = `${formData.jobTitle} at ${formData.company}`;
      
      // Save the generated guide to Supabase
      let guideId;
      
      if (user) {
        // For authenticated users, save to interview_guides
        const { data, error } = await supabase
          .from("interview_guides")
          .insert({
            user_id: user.id,
            title,
            candidate_name: formData.candidateName,
            job_title: formData.jobTitle,
            company: formData.company,
            content: guideContent,
            resume_filename: resumeFile?.name,
            job_description_text: formData.jobDescription,
            tone,
          })
          .select("id")
          .single();
        
        if (error) throw error;
        guideId = data.id;
        
        // Optional: Send confirmation email
        if (user.email) {
          try {
            await supabase.functions.invoke("send-confirmation", {
              body: {
                guideId,
                email: user.email,
                name: profile?.name || user.email,
                company: formData.company,
                jobTitle: formData.jobTitle
              }
            });
          } catch (emailError) {
            console.error("Failed to send confirmation email:", emailError);
          }
        }
      } else {
        // For anonymous users, save to anonymous_guides
        const { data, error } = await supabase
          .from("anonymous_guides")
          .insert({
            session_id: sessionId,
            title,
            candidate_name: formData.candidateName,
            job_title: formData.jobTitle,
            company: formData.company,
            content: guideContent,
            resume_filename: resumeFile?.name,
            job_description_text: formData.jobDescription,
            tone,
          })
          .select("id")
          .single();
        
        if (error) throw error;
        guideId = data.id;
        
        // Update the anonymous guide count
        setAnonymousGuideCount(prevCount => prevCount + 1);
      }

      onGuideGenerated(guideContent);
      
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-2">Upload Your Resume</h2>
            <p className="text-muted-foreground mb-4">
              We'll use this to highlight your strengths and tailor every part of the interview guide to your experience.
            </p>
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
            <div className="flex justify-end mt-4">
              <Button onClick={nextStep} disabled={!resumeFile}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      case 2:
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button
                onClick={nextStep}
                disabled={!formData.jobTitle || !formData.company || !formData.jobDescription}
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-2">Pick a Tone</h2>
            <p className="text-muted-foreground mb-4">
              Everyone has their own style. Choose the voice that fits you best—we'll write your prep guide to match.
            </p>
            <RadioGroup
              value={tone}
              onValueChange={setTone}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2 p-3 border rounded-md hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="friendly" id="friendly" />
                <Label htmlFor="friendly" className="cursor-pointer w-full">
                  <div className="font-medium">Friendly + Casual</div>
                  <p className="text-sm text-muted-foreground">Conversational and approachable</p>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-md hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="professional" id="professional" />
                <Label htmlFor="professional" className="cursor-pointer w-full">
                  <div className="font-medium">Professional + Polished</div>
                  <p className="text-sm text-muted-foreground">Formal and business-oriented</p>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-md hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="confident" id="confident" />
                <Label htmlFor="confident" className="cursor-pointer w-full">
                  <div className="font-medium">Confident + Direct</div>
                  <p className="text-sm text-muted-foreground">Bold and straight to the point</p>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-md hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="quick" id="quick" />
                <Label htmlFor="quick" className="cursor-pointer w-full">
                  <div className="font-medium">Quick Start — No Tone, Just Prep</div>
                  <p className="text-sm text-muted-foreground">Get straight to the content</p>
                </Label>
              </div>
            </RadioGroup>

            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={nextStep}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      case 4:
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
            </div>

            <div className="mt-2">
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

            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isGenerating || (!user && anonymousGuideCount >= 1)}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Guide...
                  </>
                ) : !user && anonymousGuideCount >= 1 ? (
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
        {!user && anonymousGuideCount >= 1 && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <p className="font-medium text-yellow-800">Account required</p>
              <p className="text-sm text-yellow-700">
                You've used your free guide. Please{" "}
                <a href="/auth" className="text-primary hover:underline">
                  create an account
                </a>{" "}
                to generate more interview guides.
              </p>
            </div>
          </div>
        )}
        
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex space-x-1">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`h-2 w-10 rounded-full ${
                      step === currentStep
                        ? "bg-primary"
                        : step < currentStep
                        ? "bg-primary/60"
                        : "bg-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">Step {currentStep} of 4</span>
            </div>
          </div>
          
          {renderStep()}
        </form>
      </CardContent>
    </Card>
  );
};

export default UploadForm;
