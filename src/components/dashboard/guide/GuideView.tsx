
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import GuideDisplay from "@/components/GuideDisplay";
import { InterviewGuide, JobStatus } from "@/lib/types";
import { useNavigate } from "react-router-dom";

export interface GuideViewProps {
  selectedGuide: InterviewGuide | null;
  markdownContent: string;
  isLoading?: boolean;
  onShowFeedbackForm: () => void;
  onReset: () => void;
  onGuideSelect?: (guide: InterviewGuide) => void;
}

const GuideView = ({ 
  selectedGuide, 
  markdownContent,
  isLoading = false, 
  onShowFeedbackForm,
  onReset,
  onGuideSelect
}: GuideViewProps) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (selectedGuide && onGuideSelect) {
      onGuideSelect(selectedGuide);
    }
  }, [selectedGuide, onGuideSelect]);
  
  // Get appropriate action based on job status
  const getActionForJobStatus = (status?: JobStatus) => {
    switch (status) {
      case "applied":
        return { label: "Schedule Interview", action: () => {} };
      case "interview_scheduled":
        return { label: "Prepare for Interview", action: () => {} };
      case "interview_completed":
        return { 
          label: "Add Interview Feedback", 
          action: onShowFeedbackForm
        };
      case "feedback_provided":
        return { 
          label: "Generate Follow-up Email", 
          action: onShowFeedbackForm
        };
      default:
        return { label: "View Details", action: () => {} };
    }
  };

  const handleUpgrade = () => {
    navigate('/pricing');
  };
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading guide...</div>;
  }
  
  if (!selectedGuide && !markdownContent) {
    return <div className="text-center p-8">Select a guide to view its details</div>;
  }

  return (
    <div id="guideDisplay" className="w-full max-w-4xl mx-auto">
      <GuideDisplay 
        markdownContent={markdownContent} 
        title={selectedGuide?.title}
        company={selectedGuide?.company}
        jobTitle={selectedGuide?.jobTitle}
        candidateName={selectedGuide?.candidateName}
        onUpgrade={handleUpgrade}
      />
      <div className="mt-8 flex justify-center space-x-4">
        {selectedGuide && (
          <Button 
            onClick={getActionForJobStatus(selectedGuide.status).action} 
            variant="default"
          >
            {getActionForJobStatus(selectedGuide.status).label}
          </Button>
        )}
        
        <Button onClick={onReset} variant="outline">
          Create Another Guide
        </Button>
      </div>
    </div>
  );
};

export default GuideView;
