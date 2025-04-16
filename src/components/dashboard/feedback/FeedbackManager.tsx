
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import StructuredFeedbackForm from "@/components/feedback/StructuredFeedbackForm";
import FollowUpEmailGenerator from "@/components/FollowUpEmailGenerator";
import { InterviewGuide, InterviewFeedback } from "@/lib/types";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface FeedbackManagerProps {
  guide: InterviewGuide | null;
  isSubmittingFeedback: boolean;
  showFeedbackForm: boolean;
  showFollowUpGenerator: boolean;
  feedbackData: InterviewFeedback | null;
  onFeedbackSubmitted: (feedback: InterviewFeedback) => Promise<void>;
  onFollowUpGenerated: () => Promise<void>;
  onCancel: () => void;
  onBackToFeedback: () => void;
}

const FeedbackManager = ({
  guide,
  isSubmittingFeedback,
  showFeedbackForm,
  showFollowUpGenerator,
  feedbackData,
  onFeedbackSubmitted,
  onFollowUpGenerated,
  onCancel,
  onBackToFeedback
}: FeedbackManagerProps) => {
  
  if (showFeedbackForm) {
    return (
      <div id="feedbackForm" className="w-full max-w-3xl mx-auto">
        <StructuredFeedbackForm
          jobTitle={guide?.jobTitle || ""}
          company={guide?.company || ""}
          onSubmit={onFeedbackSubmitted}
          onCancel={onCancel}
          isLoading={isSubmittingFeedback}
          initialFeedback={guide?.feedback}
        />
      </div>
    );
  }
  
  if (showFollowUpGenerator && feedbackData) {
    return (
      <div id="followUpGenerator" className="w-full max-w-3xl mx-auto">
        <FollowUpEmailGenerator
          feedback={feedbackData}
          candidateName={guide?.candidateName}
          jobTitle={guide?.jobTitle || ""}
          company={guide?.company || ""}
          onBack={onBackToFeedback}
          onEmailGenerated={onFollowUpGenerated}
        />
      </div>
    );
  }
  
  return null;
};

export default FeedbackManager;
