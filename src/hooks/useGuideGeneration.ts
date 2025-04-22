
import { useState } from "react";
import { UploadFormData } from "@/lib/types";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { AIProvider } from "@/lib/ai/types";
import { getAIProvider } from "@/lib/ai/provider-factory";

interface SaveGuideParams {
  content: string;
  jobTitle: string;
  company: string;
  candidateName: string;
  title: string;
  userId?: string;
  sessionId?: string;
  resumeFileName?: string;
  jobDescriptionText?: string;
}

const extractTextFromResumeFile = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target?.result as string;
      resolve(text);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsText(file);
  });
};

const generateAIResponse = async (
  formData: UploadFormData,
  aiProvider: AIProvider
) => {
  console.log("Starting AI response generation...");
  
  const systemPrompt = `
    You are an expert interview coach. You help people prepare for job interviews by providing them with a list of questions to practice.
    You are provided with the job description, the candidate's resume, and the desired tone of the interview guide.
    You will generate a list of questions tailored to the job description and the candidate's resume.
    The questions should be relevant to the job and the candidate's experience.
    The questions should be open-ended and designed to help the candidate think critically about their experience.
    The questions should be formatted as a markdown list.
  `;

  const userPrompt = `
    I need you to generate a list of interview questions based on the following information:
    Job Title: ${formData.jobTitle}
    Company: ${formData.company}
    Job Description: ${formData.jobDescription}
    Resume: ${formData.resumeText}
    Tone: ${formData.tone}
    Interview Format: ${formData.interviewFormat}
  `;

  const prompt = {
    systemPrompt,
    userPrompt,
  };

  console.log("AI provider:", aiProvider);
  console.log("Sending prompt to AI provider:", { systemPrompt, userPrompt });

  try {
    const response = await aiProvider.generateGuide(prompt);
    console.log("AI response received:", response);
    return response;
  } catch (error) {
    console.error("Error in generateAIResponse:", error);
    throw error;
  }
};

interface UseGuideGenerationProps {
  sessionId: string;
  incrementGuideCount: () => void;
  onGuideGenerated: (markdownContent: string) => void;
}

export const useGuideGeneration = ({
  sessionId,
  incrementGuideCount,
  onGuideGenerated
}: UseGuideGenerationProps) => {
  const { user, profile } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Getting AI provider with added logging
  console.log("Initializing AI provider...");
  const aiProvider = getAIProvider();
  console.log("AI provider initialized:", aiProvider);

  const generateGuide = async (
    formData: UploadFormData,
    resumeFile: File | null,
    tone: string,
    interviewFormat: string
  ) => {
    try {
      console.log("Generate guide started with params:", { formData, tone, interviewFormat });
      setIsGenerating(true);
      
      // Extract resume text from uploaded file (if available)
      let resumeText = "";
      if (resumeFile) {
        resumeText = await extractTextFromResumeFile(resumeFile);
      }

      // Combine form data and resume content
      const completeFormData = {
        ...formData,
        resumeText,
        tone,
        interviewFormat
      };

      // Generate title
      const title = `${formData.jobTitle} at ${formData.company}`;
      
      console.log("Calling generateAIResponse with:", { completeFormData });
      // Get AI response based on inputs
      const response = await generateAIResponse(completeFormData, aiProvider);
      console.log("AI response received in generateGuide:", response);

      if (response.error) {
        throw new Error(response.error);
      }

      // Save guide to database based on auth state
      await saveGeneratedGuide({
        content: response.content,
        jobTitle: formData.jobTitle,
        company: formData.company,
        candidateName: formData.candidateName || "Anonymous",
        title,
        userId: user?.id,
        sessionId,
        resumeFileName: resumeFile?.name,
        jobDescriptionText: formData.jobDescription
      });

      // If user is not logged in, increment guide count
      if (!user) {
        incrementGuideCount();
      }

      toast.success("Interview guide generated successfully!");
      onGuideGenerated(response.content);

    } catch (error: any) {
      console.error("Guide generation error:", error);
      toast.error(`Failed to generate guide: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const saveGeneratedGuide = async ({
    content,
    jobTitle,
    company,
    candidateName,
    title,
    userId,
    sessionId,
    resumeFileName,
    jobDescriptionText
  }: SaveGuideParams) => {
    try {
      if (userId) {
        // Save for authenticated user
        await supabase.from("interview_guides").insert({
          id: uuidv4(),
          user_id: userId,
          title,
          candidate_name: candidateName || (profile?.name ?? "User"),
          job_title: jobTitle,
          company,
          content,
          resume_filename: resumeFileName,
          job_description_text: jobDescriptionText
        });
      } else {
        // Save for anonymous user
        await supabase.from("anonymous_guides").insert({
          session_id: sessionId,
          title,
          candidate_name: candidateName,
          job_title: jobTitle,
          company,
          content,
          resume_filename: resumeFileName,
          job_description_text: jobDescriptionText
        });
      }
    } catch (error) {
      console.error("Error saving guide:", error);
      throw new Error("Failed to save guide to database");
    }
  };

  return {
    isGenerating,
    generateGuide
  };
};
