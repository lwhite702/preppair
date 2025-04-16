
import React from 'react';
import { Button } from "@/components/ui/button";
import GuideDisplay from "@/components/GuideDisplay";
import { InterviewGuide, JobStatus } from "@/lib/types";

interface GuideViewProps {
  guide: InterviewGuide | null;
  markdownContent: string;
  onShowFeedbackForm: () => void;
  onReset: () => void;
}

const GuideView = ({ guide, markdownContent, onShowFeedbackForm, onReset }: GuideViewProps) => {
  
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

  return (
    <div id="guideDisplay" className="w-full max-w-4xl mx-auto">
      <GuideDisplay 
        markdownContent={markdownContent} 
        title={guide?.title}
        company={guide?.company}
        jobTitle={guide?.jobTitle}
        candidateName={guide?.candidateName}
      />
      <div className="mt-8 flex justify-center space-x-4">
        {guide && (
          <Button 
            onClick={getActionForJobStatus(guide.status).action} 
            variant="default"
          >
            {getActionForJobStatus(guide.status).label}
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
