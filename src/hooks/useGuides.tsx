
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { InterviewGuide, InterviewFeedback } from "@/lib/types";
import { toast } from "sonner";

export const useGuides = (userId: string | undefined) => {
  const [guides, setGuides] = useState<InterviewGuide[]>([]);
  const [isLoadingGuides, setIsLoadingGuides] = useState(true);

  const fetchGuides = async () => {
    if (!userId) {
      setGuides([]);
      setIsLoadingGuides(false);
      return;
    }
    
    try {
      setIsLoadingGuides(true);
      
      const { data, error } = await supabase
        .from("interview_guides")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      
      if (data) {
        setGuides(data.map(guide => {
          // Parse the feedback data if it exists
          let parsedFeedback: InterviewFeedback | undefined = undefined;
          
          if (guide.feedback) {
            // Safely parse feedback data
            try {
              const feedbackData = guide.feedback as Record<string, any>;
              
              parsedFeedback = {
                interviewerNames: feedbackData.interviewerNames || [],
                questions: feedbackData.questions || "",
                answers: feedbackData.answers || "",
                impressions: feedbackData.impressions || "",
                nextSteps: feedbackData.nextSteps || "",
                interviewDate: feedbackData.interviewDate || new Date().toISOString().split('T')[0],
                ratings: feedbackData.ratings
              };
            } catch (e) {
              console.error("Error parsing feedback data:", e);
            }
          }
          
          return {
            id: guide.id,
            userId: guide.user_id,
            title: guide.title,
            candidateName: guide.candidate_name,
            jobTitle: guide.job_title,
            company: guide.company,
            createdAt: new Date(guide.created_at),
            content: guide.content,
            resumeFileName: guide.resume_filename,
            jobDescriptionText: guide.job_description_text,
            feedback: parsedFeedback
          };
        }));
      }
    } catch (error) {
      console.error("Error fetching guides:", error);
      toast.error("Failed to load your guides");
    } finally {
      setIsLoadingGuides(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchGuides();
    }
  }, [userId]);

  return {
    guides,
    isLoadingGuides,
    fetchGuides
  };
};
