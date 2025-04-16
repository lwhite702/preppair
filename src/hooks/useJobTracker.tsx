import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { InterviewGuide, JobStatus, HiringDecision, InterviewFeedback, CalendarEvent } from "@/lib/types";

export const useJobTracker = (userId: string | undefined, guideId?: string) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [jobs, setJobs] = useState<InterviewGuide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const parseFeedback = (feedbackJson: any): InterviewFeedback | undefined => {
    if (!feedbackJson) return undefined;
    
    return {
      interviewerNames: Array.isArray(feedbackJson.interviewerNames) ? feedbackJson.interviewerNames : [],
      questions: feedbackJson.questions || '',
      answers: feedbackJson.answers || '',
      impressions: feedbackJson.impressions || '',
      nextSteps: feedbackJson.nextSteps || '',
      interviewDate: feedbackJson.interviewDate || '',
      ratings: {
        communicationSkills: feedbackJson.ratings?.communicationSkills || 0,
        technicalSkills: feedbackJson.ratings?.technicalSkills || 0,
        problemSolvingSkills: feedbackJson.ratings?.problemSolvingSkills || 0,
        culturalFit: feedbackJson.ratings?.culturalFit || 0,
        overall: feedbackJson.ratings?.overall || 0,
        technical: feedbackJson.ratings?.technical || 0,
        cultural: feedbackJson.ratings?.cultural || 0
      }
    };
  };
  
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
          status: guide.status as JobStatus || "applied",
          interviewDate: guide.interview_date,
          reminderSent: guide.reminder_sent,
          followUpSent: guide.follow_up_sent,
          hiringDecision: guide.hiring_decision as HiringDecision || "pending"
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
  
  const updateJobStatus = async (id: string, status: JobStatus) => {
    if (!userId) return;
    
    try {
      setIsUpdating(true);
      
      const { error } = await supabase
        .from("interview_guides")
        .update({ status })
        .eq("id", id)
        .eq("user_id", userId);
      
      if (error) throw error;
      
      setJobs(prev => prev.map(job => 
        job.id === id ? { ...job, status } : job
      ));
      
      toast.success("Job status updated successfully");
    } catch (error) {
      console.error("Error updating job status:", error);
      toast.error("Failed to update job status");
    } finally {
      setIsUpdating(false);
    }
  };
  
  const updateInterviewDate = async (id: string, interviewDate: string) => {
    if (!userId) return;
    
    try {
      setIsUpdating(true);
      
      const { error } = await supabase
        .from("interview_guides")
        .update({ 
          interview_date: interviewDate,
          status: "interview_scheduled"
        })
        .eq("id", id)
        .eq("user_id", userId);
      
      if (error) throw error;
      
      setJobs(prev => prev.map(job => 
        job.id === id ? { ...job, interviewDate, status: "interview_scheduled" } : job
      ));
      
      toast.success("Interview date scheduled successfully");
    } catch (error) {
      console.error("Error updating interview date:", error);
      toast.error("Failed to schedule interview");
    } finally {
      setIsUpdating(false);
    }
  };
  
  const updateHiringDecision = async (id: string, hiringDecision: HiringDecision) => {
    if (!userId) return;
    
    try {
      setIsUpdating(true);
      
      let newStatus: JobStatus;
      
      switch (hiringDecision) {
        case "offer_received":
          newStatus = "offer_received";
          break;
        case "rejected":
          newStatus = "rejected";
          break;
        default:
          newStatus = "pending_decision";
      }
      
      const { error } = await supabase
        .from("interview_guides")
        .update({ 
          hiring_decision: hiringDecision,
          status: newStatus
        })
        .eq("id", id)
        .eq("user_id", userId);
      
      if (error) throw error;
      
      setJobs(prev => prev.map(job => 
        job.id === id ? { ...job, hiringDecision, status: newStatus } : job
      ));
      
      toast.success("Hiring decision updated successfully");
    } catch (error) {
      console.error("Error updating hiring decision:", error);
      toast.error("Failed to update hiring decision");
    } finally {
      setIsUpdating(false);
    }
  };
  
  const addCalendarEvent = async (event: Omit<CalendarEvent, "id" | "completed">) => {
    if (!userId) return null;
    
    try {
      const dbType = event.type === "follow-up" ? "follow_up" : event.type;
      
      const { data, error } = await supabase
        .from("calendar_events")
        .insert({
          user_id: userId,
          title: event.title,
          description: event.description,
          start_time: event.startTime,
          end_time: event.endTime,
          guide_id: event.guideId,
          type: dbType,
          completed: false
        })
        .select("id")
        .single();
      
      if (error) throw error;
      
      return data?.id;
    } catch (error) {
      console.error("Error adding calendar event:", error);
      toast.error("Failed to add event to calendar");
      return null;
    }
  };
  
  const markFollowUpSent = async (id: string) => {
    if (!userId) return;
    
    try {
      setIsUpdating(true);
      
      const { error } = await supabase
        .from("interview_guides")
        .update({ 
          follow_up_sent: true,
          status: "follow_up_sent" 
        })
        .eq("id", id)
        .eq("user_id", userId);
      
      if (error) throw error;
      
      setJobs(prev => prev.map(job => 
        job.id === id ? { ...job, followUpSent: true, status: "follow_up_sent" } : job
      ));
      
      const guideData = jobs.find(job => job.id === id);
      if (guideData) {
        const followUpDate = new Date();
        followUpDate.setDate(followUpDate.getDate() + 7);
        
        await addCalendarEvent({
          userId,
          title: `Follow up with ${guideData.company} for ${guideData.jobTitle}`,
          description: `Check on your application status after sending your follow-up email`,
          startTime: followUpDate.toISOString(),
          endTime: followUpDate.toISOString(),
          guideId: id,
          type: "follow-up"
        });
      }
      
      toast.success("Follow-up email sent and tracked successfully");
    } catch (error) {
      console.error("Error marking follow-up sent:", error);
      toast.error("Failed to update follow-up status");
    } finally {
      setIsUpdating(false);
    }
  };
  
  useEffect(() => {
    if (userId) {
      fetchJobs();
    }
  }, [userId]);
  
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
          status: data.status as JobStatus || "applied",
          interviewDate: data.interview_date,
          reminderSent: data.reminder_sent,
          followUpSent: data.follow_up_sent,
          hiringDecision: data.hiring_decision as HiringDecision || "pending"
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
    if (guideId && userId) {
      const loadGuide = async () => {
        const guide = await fetchSingleGuide(guideId);
        if (guide) {
          setJobs([guide]);
        }
      };
      
      loadGuide();
    }
  }, [guideId, userId]);
  
  return {
    jobs,
    isLoading,
    isUpdating,
    updateJobStatus,
    updateInterviewDate,
    updateHiringDecision,
    markFollowUpSent,
    addCalendarEvent,
    refreshJobs: fetchJobs
  };
};
