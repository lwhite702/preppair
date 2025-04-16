
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import StructuredFeedbackForm from "@/components/feedback/StructuredFeedbackForm";
import FollowUpEmailGenerator from "@/components/FollowUpEmailGenerator";
import { InterviewGuide, InterviewFeedback } from "@/lib/types";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export interface FeedbackManagerProps {
  selectedGuide: InterviewGuide | null;
  isLoading: boolean;
  onGuideSelect: (guide: InterviewGuide) => void;
  onRefresh: () => void;
}

const FeedbackManager = ({
  selectedGuide,
  isLoading,
  onRefresh
}: FeedbackManagerProps) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showFollowUpGenerator, setShowFollowUpGenerator] = useState(false);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState<InterviewFeedback | null>(null);
  
  // Show feedback form when a guide is selected
  useEffect(() => {
    if (selectedGuide && !selectedGuide.feedback) {
      setShowFeedbackForm(true);
      setShowFollowUpGenerator(false);
    } else if (selectedGuide && selectedGuide.feedback) {
      setFeedbackData(selectedGuide.feedback);
      setShowFeedbackForm(false);
      setShowFollowUpGenerator(true);
    } else {
      setShowFeedbackForm(false);
      setShowFollowUpGenerator(false);
    }
  }, [selectedGuide]);
  
  const onFeedbackSubmitted = async (feedback: InterviewFeedback) => {
    try {
      setIsSubmittingFeedback(true);
      
      if (!selectedGuide) {
        toast.error("No guide selected");
        return;
      }
      
      // Update guide with feedback
      const { error } = await supabase
        .from('interview_guides')
        .update({ feedback, status: 'feedback_provided' })
        .eq('id', selectedGuide.id);
      
      if (error) throw error;
      
      setFeedbackData(feedback);
      setShowFeedbackForm(false);
      setShowFollowUpGenerator(true);
      onRefresh();
      toast.success("Feedback saved successfully");
    } catch (error) {
      console.error("Error saving feedback:", error);
      toast.error("Failed to save feedback");
    } finally {
      setIsSubmittingFeedback(false);
    }
  };
  
  const onFollowUpGenerated = async () => {
    try {
      if (!selectedGuide) {
        toast.error("No guide selected");
        return;
      }
      
      // Update guide status
      const { error } = await supabase
        .from('interview_guides')
        .update({ status: 'follow_up_sent', followUpSent: true })
        .eq('id', selectedGuide.id);
      
      if (error) throw error;
      
      onRefresh();
      toast.success("Follow-up email generated successfully");
      
      // Reset view
      setShowFollowUpGenerator(false);
    } catch (error) {
      console.error("Error updating guide status:", error);
      toast.error("Failed to update guide status");
    }
  };
  
  const onCancel = () => {
    setShowFeedbackForm(false);
    setShowFollowUpGenerator(false);
  };
  
  const onBackToFeedback = () => {
    setShowFeedbackForm(true);
    setShowFollowUpGenerator(false);
  };
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading feedback manager...</div>;
  }
  
  if (!selectedGuide) {
    return <div className="text-center p-8">Select a guide to manage feedback</div>;
  }
  
  if (showFeedbackForm) {
    return (
      <div id="feedbackForm" className="w-full max-w-3xl mx-auto">
        <StructuredFeedbackForm
          jobTitle={selectedGuide?.jobTitle || ""}
          company={selectedGuide?.company || ""}
          onSubmit={onFeedbackSubmitted}
          onCancel={onCancel}
          isLoading={isSubmittingFeedback}
          initialFeedback={selectedGuide?.feedback}
        />
      </div>
    );
  }
  
  if (showFollowUpGenerator && feedbackData) {
    return (
      <div id="followUpGenerator" className="w-full max-w-3xl mx-auto">
        <FollowUpEmailGenerator
          feedback={feedbackData}
          candidateName={selectedGuide?.candidateName}
          jobTitle={selectedGuide?.jobTitle || ""}
          company={selectedGuide?.company || ""}
          onBack={onBackToFeedback}
          onEmailGenerated={onFollowUpGenerated}
        />
      </div>
    );
  }
  
  return (
    <div className="text-center p-8">
      <p>Feedback options will appear here based on the guide status.</p>
      <Button onClick={() => setShowFeedbackForm(true)} className="mt-4">
        Add or Edit Feedback
      </Button>
    </div>
  );
};

export default FeedbackManager;
