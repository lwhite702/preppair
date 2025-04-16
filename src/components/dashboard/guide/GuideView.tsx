
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import GuideDisplay from "@/components/GuideDisplay";
import { InterviewGuide, JobStatus } from "@/lib/types";

export interface GuideViewProps {
  selectedGuide: InterviewGuide | null;
  isLoading: boolean;
  onGuideSelect: (guide: InterviewGuide) => void;
}

const GuideView = ({ selectedGuide, isLoading }: GuideViewProps) => {
  const [markdownContent, setMarkdownContent] = useState<string>("");
  
  useEffect(() => {
    if (selectedGuide) {
      setMarkdownContent(selectedGuide.content || "No content available");
    } else {
      setMarkdownContent("");
    }
  }, [selectedGuide]);
  
  const onShowFeedbackForm = () => {
    // Implement feedback form display logic
    console.log("Show feedback form");
  };
  
  const onReset = () => {
    // Implement reset logic
    console.log("Reset view");
  };
  
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
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading guide...</div>;
  }
  
  if (!selectedGuide) {
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
