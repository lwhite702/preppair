
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface InterviewFeedbackFormProps {
  guideId?: string;
  jobTitle: string;
  company: string;
  onFeedbackSubmitted: (feedback: InterviewFeedback) => void;
}

export interface InterviewFeedback {
  interviewerNames: string[];
  questions: string;
  answers: string;
  impressions: string;
  nextSteps: string;
  interviewDate: string;
}

const InterviewFeedbackForm = ({
  guideId,
  jobTitle,
  company,
  onFeedbackSubmitted,
}: InterviewFeedbackFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<InterviewFeedback>({
    interviewerNames: [""],
    questions: "",
    answers: "",
    impressions: "",
    nextSteps: "",
    interviewDate: new Date().toISOString().split('T')[0],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFeedback((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInterviewerNameChange = (index: number, value: string) => {
    const updatedInterviewers = [...feedback.interviewerNames];
    updatedInterviewers[index] = value;
    setFeedback((prev) => ({
      ...prev,
      interviewerNames: updatedInterviewers,
    }));
  };

  const addInterviewer = () => {
    setFeedback((prev) => ({
      ...prev,
      interviewerNames: [...prev.interviewerNames, ""],
    }));
  };

  const removeInterviewer = (index: number) => {
    if (feedback.interviewerNames.length <= 1) return;
    
    const updatedInterviewers = feedback.interviewerNames.filter((_, i) => i !== index);
    setFeedback((prev) => ({
      ...prev,
      interviewerNames: updatedInterviewers,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedback.questions || !feedback.impressions) {
      toast.error("Please fill in the required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, we might save this to the database
    setTimeout(() => {
      onFeedbackSubmitted(feedback);
      setIsSubmitting(false);
      toast.success("Interview feedback submitted");
    }, 500);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Record Your Interview Feedback</CardTitle>
        <CardDescription>
          Share details about your interview for {jobTitle} at {company} to get a personalized follow-up email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="interviewDate">Interview Date</Label>
            <Input
              id="interviewDate"
              name="interviewDate"
              type="date"
              required
              value={feedback.interviewDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label>Interviewer Name(s)</Label>
            {feedback.interviewerNames.map((name, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <Input
                  placeholder={`Interviewer ${index + 1} name`}
                  value={name}
                  onChange={(e) => handleInterviewerNameChange(index, e.target.value)}
                />
                {index > 0 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeInterviewer(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={addInterviewer}
            >
              Add Another Interviewer
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="questions" className="required">Key Questions Asked</Label>
            <Textarea
              id="questions"
              name="questions"
              placeholder="What were the main questions you were asked?"
              required
              rows={3}
              value={feedback.questions}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="answers">Your Key Responses</Label>
            <Textarea
              id="answers"
              name="answers"
              placeholder="What were your main responses or points you emphasized?"
              rows={3}
              value={feedback.answers}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="impressions" className="required">Overall Impressions</Label>
            <Textarea
              id="impressions"
              name="impressions"
              placeholder="How do you feel the interview went? What was the interviewer's response?"
              required
              rows={3}
              value={feedback.impressions}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nextSteps">Next Steps Discussed</Label>
            <Textarea
              id="nextSteps"
              name="nextSteps"
              placeholder="Was there any mention of next steps in the process?"
              rows={2}
              value={feedback.nextSteps}
              onChange={handleInputChange}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
              </>
            ) : (
              "Generate Follow-up Email"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default InterviewFeedbackForm;
