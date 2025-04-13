
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface QuestionResponseFieldProps {
  question: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  hint?: string;
  className?: string;
  textareaClassName?: string;
}

const QuestionResponseField = ({
  question,
  value,
  onChange,
  placeholder = "Enter your response...",
  required = false,
  hint,
  className,
  textareaClassName,
}: QuestionResponseFieldProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between">
        <Label 
          htmlFor={`question-${question.substring(0, 20).replace(/\s+/g, "-").toLowerCase()}`}
          className={cn(required && "after:content-['*'] after:ml-0.5 after:text-red-500")}
        >
          {question}
        </Label>
      </div>
      {hint && <p className="text-sm text-muted-foreground">{hint}</p>}
      <Textarea
        id={`question-${question.substring(0, 20).replace(/\s+/g, "-").toLowerCase()}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn("min-h-[100px]", textareaClassName)}
        required={required}
      />
    </div>
  );
};

export default QuestionResponseField;
