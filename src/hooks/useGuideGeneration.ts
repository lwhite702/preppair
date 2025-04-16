
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { generateInterviewGuide } from "@/lib/openai";
import { UploadFormData } from "@/lib/types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface UseGuideGenerationProps {
  sessionId: string;
  incrementGuideCount: () => void;
  onGuideGenerated: (markdownContent: string) => void;
}

export const useGuideGeneration = ({
  sessionId,
  incrementGuideCount,
  onGuideGenerated,
}: UseGuideGenerationProps) => {
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  
  const [isGenerating, setIsGenerating] = useState(false);

  const generateGuide = async (
    formData: UploadFormData,
    resumeFile: File | null,
    tone: string,
    interviewFormat: "virtual" | "phone" | "in-person"
  ) => {
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
      let resumeText = "";
      
      if (resumeFile) {
        // In a real implementation, we'd parse the resume file here
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
        interviewFormat,
      });

      if (response.error) {
        throw new Error(response.error);
      }

      const guideContent = response.content;
      
      const title = `${formData.jobTitle} at ${formData.company}`;
      
      let guideId;
      
      if (user) {
        // Save guide for authenticated user
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
        
        // Send email confirmation if user has email
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
        // Save guide for anonymous user
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
        incrementGuideCount();
      }

      onGuideGenerated(guideContent);
      
      toast({
        title: "Success!",
        description: "Your interview guide has been created.",
      });

      return true;
    } catch (error) {
      console.error("Error generating guide:", error);
      toast({
        title: "Generation failed",
        description: "There was a problem creating your guide. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    generateGuide
  };
};
