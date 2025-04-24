
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { InterviewGuide } from "@/lib/types";
import { parseFeedback } from "./useFeedbackParser";

export const useJobFetcher = (userId: string | undefined, guideId?: string) => {
  const [jobs, setJobs] = useState<InterviewGuide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchJobs = async () => {
    if (!userId) {
      setJobs([]);
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from("interview_guides")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      
      if (data) {
        const mappedGuides: InterviewGuide[] = data.map(guide => ({
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
          feedback: parseFeedback(guide.feedback),
          status: guide.status as InterviewGuide["status"] || "applied",
          interviewDate: guide.interview_date,
          reminderSent: guide.reminder_sent,
          followUpSent: guide.follow_up_sent,
          hiringDecision: guide.hiring_decision as InterviewGuide["hiringDecision"] || "pending"
        }));
        
        setJobs(mappedGuides);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to load your job applications");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSingleGuide = async (id: string) => {
    if (!userId || !id) return null;
    
    try {
      const { data, error } = await supabase
        .from("interview_guides")
        .select("*")
        .eq("id", id)
        .eq("user_id", userId)
        .single();
      
      if (error) throw error;
      
      if (data) {
        return {
          id: data.id,
          userId: data.user_id,
          title: data.title,
          candidateName: data.candidate_name,
          jobTitle: data.job_title,
          company: data.company,
          createdAt: new Date(data.created_at),
          content: data.content,
          resumeFileName: data.resume_filename,
          jobDescriptionText: data.job_description_text,
          feedback: parseFeedback(data.feedback),
          status: data.status as InterviewGuide["status"] || "applied",
          interviewDate: data.interview_date,
          reminderSent: data.reminder_sent,
          followUpSent: data.follow_up_sent,
          hiringDecision: data.hiring_decision as InterviewGuide["hiringDecision"] || "pending"
        };
      }
      
      return null;
    } catch (error) {
      console.error("Error fetching guide:", error);
      toast.error("Failed to load job details");
      return null;
    }
  };

  useEffect(() => {
    if (userId) {
      if (guideId) {
        fetchSingleGuide(guideId).then(guide => {
          if (guide) setJobs([guide]);
        });
      } else {
        fetchJobs();
      }
    }
  }, [userId, guideId]);

  return {
    jobs,
    isLoading,
    fetchJobs,
    fetchSingleGuide
  };
};
