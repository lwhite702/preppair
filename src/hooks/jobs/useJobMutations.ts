
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { JobStatus, HiringDecision, InterviewGuide } from "@/lib/types";

export const useJobMutations = (userId: string | undefined) => {
  const [isUpdating, setIsUpdating] = useState(false);

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
      
      toast.success("Job status updated successfully");
      return true;
    } catch (error) {
      console.error("Error updating job status:", error);
      toast.error("Failed to update job status");
      return false;
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
      
      toast.success("Interview date scheduled successfully");
      return true;
    } catch (error) {
      console.error("Error updating interview date:", error);
      toast.error("Failed to schedule interview");
      return false;
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
      
      toast.success("Hiring decision updated successfully");
      return true;
    } catch (error) {
      console.error("Error updating hiring decision:", error);
      toast.error("Failed to update hiring decision");
      return false;
    } finally {
      setIsUpdating(false);
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
      
      toast.success("Follow-up email sent and tracked successfully");
      return true;
    } catch (error) {
      console.error("Error marking follow-up sent:", error);
      toast.error("Failed to update follow-up status");
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    isUpdating,
    updateJobStatus,
    updateInterviewDate,
    updateHiringDecision,
    markFollowUpSent
  };
};
