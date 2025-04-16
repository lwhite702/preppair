
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import StructuredFeedbackForm from "@/components/feedback/StructuredFeedbackForm";
import FollowUpEmailGenerator from "@/components/FollowUpEmailGenerator";
import { InterviewGuide, InterviewFeedback } from "@/lib/types";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export interface FeedbackManagerProps {
  selectedGuide: InterviewGuide | null;
  isLoading?: boolean;
  isSubmittingFeedback?: boolean;
  showFeedbackForm?: boolean;
  showFollowUpGenerator?: boolean;
  feedbackData?: InterviewFeedback | null;
  onGuideSelect?: (guide: InterviewGuide) => void;
  onRefresh?: () => void;
  onFeedbackSubmitted?: (feedback: InterviewFeedback) => Promise<void>;
  onFollowUpGenerated?: () => Promise<void>;
  onCancel?: () => void;
  onBackToFeedback?: () => void;
}

const FeedbackManager = ({
  selectedGuide,
  isLoading = false,
  isSubmittingFeedback = false,
  showFeedbackForm = false,
  showFollowUpGenerator = false,
  feedbackData = null,
  onGuideSelect,
  onRefresh,
  onFeedbackSubmitted,
  onFollowUpGenerated,
  onCancel,
  onBackToFeedback
}: FeedbackManagerProps) => {
  const [internalShowFeedbackForm, setInternalShowFeedbackForm] = useState(showFeedbackForm);
  const [internalShowFollowUpGenerator, setInternalShowFollowUpGenerator] = useState(showFollowUpGenerator);
  const [internalFeedbackData, setInternalFeedbackData] = useState<InterviewFeedback | null>(feedbackData);
  const [internalIsSubmittingFeedback, setInternalIsSubmittingFeedback] = useState(isSubmittingFeedback);
  
  // Sync internal state with props when they change
  useEffect(() => {
    setInternalShowFeedbackForm(showFeedbackForm);
    setInternalShowFollowUpGenerator(showFollowUpGenerator);
    setInternalFeedbackData(feedbackData);
    setInternalIsSubmittingFeedback(isSubmittingFeedback);
  }, [showFeedbackForm, showFollowUpGenerator, feedbackData, isSubmittingFeedback]);
  
  // Show feedback form when a guide is selected
  useEffect(() => {
    if (selectedGuide && onGuideSelect) {
      onGuideSelect(selectedGuide);
      
      if (!selectedGuide.feedback) {
        setInternalShowFeedbackForm(true);
        setInternalShowFollowUpGenerator(false);
      } else {
        setInternalFeedbackData(selectedGuide.feedback);
        setInternalShowFeedbackForm(false);
        setInternalShowFollowUpGenerator(true);
      }
    }
  }, [selectedGuide, onGuideSelect]);
  
  const handleFeedbackSubmitted = async (feedback: InterviewFeedback) => {
    try {
      setInternalIsSubmittingFeedback(true);
      
      if (!selectedGuide) {
        toast.error("No guide selected");
        return;
      }
      
      if (onFeedbackSubmitted) {
        await onFeedbackSubmitted(feedback);
      } else {
        // Default implementation if prop not provided
        // Convert feedback to a plain JSON object compatible with Supabase
        const feedbackJson = {
          interviewerNames: feedback.interviewerNames,
          questions: feedback.questions,
          answers: feedback.answers,
          impressions: feedback.impressions,
          nextSteps: feedback.nextSteps,
          interviewDate: feedback.interviewDate,
          ratings: {
            communicationSkills: feedback.ratings.communicationSkills,
            technicalSkills: feedback.ratings.technicalSkills,
            problemSolvingSkills: feedback.ratings.problemSolvingSkills,
            culturalFit: feedback.ratings.culturalFit,
            overall: feedback.ratings.overall || 0,
            technical: feedback.ratings.technical || 0,
            cultural: feedback.ratings.cultural || 0
          }
        };
        
        // Update guide with feedback
        const { error } = await supabase
          .from('interview_guides')
          .update({ feedback: feedbackJson, status: 'feedback_provided' })
          .eq('id', selectedGuide.id);
        
        if (error) throw error;
        
        if (onRefresh) onRefresh();
      }
      
      setInternalFeedbackData(feedback);
      setInternalShowFeedbackForm(false);
      setInternalShowFollowUpGenerator(true);
      toast.success("Feedback saved successfully");
    } catch (error) {
      console.error("Error saving feedback:", error);
      toast.error("Failed to save feedback");
    } finally {
      setInternalIsSubmittingFeedback(false);
    }
  };
  
  const handleFollowUpGenerated = async () => {
    try {
      if (!selectedGuide) {
        toast.error("No guide selected");
        return;
      }
      
      if (onFollowUpGenerated) {
        await onFollowUpGenerated();
      } else {
        // Default implementation if prop not provided
        // Update guide status
        const { error } = await supabase
          .from('interview_guides')
          .update({ status: 'follow_up_sent', followUpSent: true })
          .eq('id', selectedGuide.id);
        
        if (error) throw error;
        
        if (onRefresh) onRefresh();
      }
      
      toast.success("Follow-up email generated successfully");
      
      // Reset view
      setInternalShowFollowUpGenerator(false);
    } catch (error) {
      console.error("Error updating guide status:", error);
      toast.error("Failed to update guide status");
    }
  };
  
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      setInternalShowFeedbackForm(false);
      setInternalShowFollowUpGenerator(false);
    }
  };
  
  const handleBackToFeedback = () => {
    if (onBackToFeedback) {
      onBackToFeedback();
    } else {
      setInternalShowFeedbackForm(true);
      setInternalShowFollowUpGenerator(false);
    }
  };
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading feedback manager...</div>;
  }
  
  if (!selectedGuide) {
    return <div className="text-center p-8">Select a guide to manage feedback</div>;
  }
  
  if (internalShowFeedbackForm || showFeedbackForm) {
    return (
      <div id="feedbackForm" className="w-full max-w-3xl mx-auto">
        <StructuredFeedbackForm
          jobTitle={selectedGuide?.jobTitle || ""}
          company={selectedGuide?.company || ""}
          onSubmit={handleFeedbackSubmitted}
          onCancel={handleCancel}
          isLoading={internalIsSubmittingFeedback}
          initialFeedback={selectedGuide?.feedback}
        />
      </div>
    );
  }
  
  if ((internalShowFollowUpGenerator || showFollowUpGenerator) && (internalFeedbackData || feedbackData)) {
    const feedback = internalFeedbackData || feedbackData;
    
    if (!feedback) {
      return <div className="text-center p-8">No feedback data available</div>;
    }
    
    return (
      <div id="followUpGenerator" className="w-full max-w-3xl mx-auto">
        <FollowUpEmailGenerator
          feedback={feedback}
          candidateName={selectedGuide?.candidateName}
          jobTitle={selectedGuide?.jobTitle || ""}
          company={selectedGuide?.company || ""}
          onBack={handleBackToFeedback}
          onEmailGenerated={handleFollowUpGenerated}
        />
      </div>
    );
  }
  
  return (
    <div className="text-center p-8">
      <p>Feedback options will appear here based on the guide status.</p>
      <Button onClick={() => setInternalShowFeedbackForm(true)} className="mt-4">
        Add or Edit Feedback
      </Button>
    </div>
  );
};

export default FeedbackManager;
