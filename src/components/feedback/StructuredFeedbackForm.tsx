
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { InterviewFeedback } from "@/lib/types";

import InterviewerField from "./InterviewerField";
import QuestionResponseField from "./QuestionResponseField";
import FeedbackCategory from "./FeedbackCategory";
import RatingField from "./RatingField";

interface StructuredFeedbackFormProps {
  initialFeedback?: Partial<InterviewFeedback & { ratings?: Record<string, number> }>;
  jobTitle: string;
  company: string;
  onSubmit: (feedback: InterviewFeedback & { ratings?: Record<string, number> }) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const StructuredFeedbackForm = ({
  initialFeedback,
  jobTitle,
  company,
  onSubmit,
  onCancel,
  isLoading = false,
}: StructuredFeedbackFormProps) => {
  const [feedback, setFeedback] = useState<InterviewFeedback & { ratings?: Record<string, number> }>({
    interviewerNames: initialFeedback?.interviewerNames || [""],
    questions: initialFeedback?.questions || "",
    answers: initialFeedback?.answers || "",
    impressions: initialFeedback?.impressions || "",
    nextSteps: initialFeedback?.nextSteps || "",
    interviewDate: initialFeedback?.interviewDate || new Date().toISOString().split('T')[0],
    ratings: initialFeedback?.ratings || {
      overall: 0,
      technical: 0,
      cultural: 0
    }
  });

  const handleInputChange = (field: keyof InterviewFeedback, value: string) => {
    setFeedback(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRatingChange = (ratingKey: string, value: number) => {
    setFeedback(prev => ({
      ...prev,
      ratings: {
        ...(prev.ratings || {}),
        [ratingKey]: value
      }
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedback.questions || !feedback.impressions) {
      toast.error("Please fill in the required fields");
      return;
    }
    
    onSubmit(feedback);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Interview Feedback</CardTitle>
        <CardDescription>
          Record your feedback for the {jobTitle} position at {company}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleFormSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="interviewDate">Interview Date</Label>
              <Input
                id="interviewDate"
                type="date"
                required
                value={feedback.interviewDate}
                onChange={(e) => handleInputChange("interviewDate", e.target.value)}
              />
            </div>
            
            <InterviewerField
              interviewers={feedback.interviewerNames}
              onInterviewersChange={(interviewers) => 
                handleInputChange("interviewerNames", interviewers as any)
              }
            />
          </div>
          
          <FeedbackCategory 
            title="Interview Performance" 
            description="Rate different aspects of the interview"
          >
            <div className="space-y-4">
              <RatingField
                label="Overall Interview Performance"
                value={feedback.ratings?.overall || 0}
                onChange={(value) => handleRatingChange("overall", value)}
                description="How well did the interview go overall?"
              />
              
              <RatingField
                label="Technical Assessment"
                value={feedback.ratings?.technical || 0}
                onChange={(value) => handleRatingChange("technical", value)}
                description="How well did you handle the technical questions?"
              />
              
              <RatingField
                label="Cultural Fit"
                value={feedback.ratings?.cultural || 0}
                onChange={(value) => handleRatingChange("cultural", value)}
                description="How well did you connect with the interviewer(s)?"
              />
            </div>
          </FeedbackCategory>
          
          <FeedbackCategory title="Interview Details">
            <div className="space-y-4">
              <QuestionResponseField
                question="Key Questions Asked"
                value={feedback.questions}
                onChange={(value) => handleInputChange("questions", value)}
                required
                hint="What were the main questions you were asked?"
              />
              
              <QuestionResponseField
                question="Your Key Responses"
                value={feedback.answers}
                onChange={(value) => handleInputChange("answers", value)}
                hint="What were your main points or responses?"
              />
              
              <QuestionResponseField
                question="Overall Impressions"
                value={feedback.impressions}
                onChange={(value) => handleInputChange("impressions", value)}
                required
                hint="How do you feel the interview went?"
              />
              
              <QuestionResponseField
                question="Next Steps"
                value={feedback.nextSteps}
                onChange={(value) => handleInputChange("nextSteps", value)}
                hint="Did the interviewers mention any next steps?"
              />
            </div>
          </FeedbackCategory>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" className="ml-auto" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
              </>
            ) : (
              "Generate Follow-up Email"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default StructuredFeedbackForm;
