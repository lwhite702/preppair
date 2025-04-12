
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
import { ArrowRight, FileText, Loader2, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

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

          <Button 
            type="submit" 
            className="w-full" 
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
