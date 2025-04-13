
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, UserMinus } from "lucide-react";

interface InterviewerFieldProps {
  interviewers: string[];
  onInterviewersChange: (interviewers: string[]) => void;
  maxInterviewers?: number;
}

const InterviewerField = ({
  interviewers,
  onInterviewersChange,
  maxInterviewers = 10,
}: InterviewerFieldProps) => {
  const handleInterviewerChange = (index: number, value: string) => {
    const updatedInterviewers = [...interviewers];
    updatedInterviewers[index] = value;
    onInterviewersChange(updatedInterviewers);
  };

  const addInterviewer = () => {
    if (interviewers.length < maxInterviewers) {
      onInterviewersChange([...interviewers, ""]);
    }
  };

  const removeInterviewer = (index: number) => {
    if (interviewers.length <= 1) return;
    
    const updatedInterviewers = interviewers.filter((_, i) => i !== index);
    onInterviewersChange(updatedInterviewers);
  };

  return (
    <div className="space-y-3">
      <Label>Interviewer Name(s)</Label>
      
      <div className="space-y-2">
        {interviewers.map((name, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              placeholder={`Interviewer ${index + 1} name`}
              value={name}
              onChange={(e) => handleInterviewerChange(index, e.target.value)}
            />
            {index > 0 && (
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                onClick={() => removeInterviewer(index)}
                title="Remove interviewer"
              >
                <UserMinus className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
      
      {interviewers.length < maxInterviewers && (
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={addInterviewer}
          className="mt-1"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add Another Interviewer
        </Button>
      )}
    </div>
  );
};

export default InterviewerField;
