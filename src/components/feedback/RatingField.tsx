import React from "react";
import { Label } from "@/components/ui/label";
import { Star, StarHalf, StarOff } from "lucide-react";

interface RatingFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  description?: string;
  maxRating?: number;
}

const RatingField = ({
  label,
  value,
  onChange,
  description,
  maxRating = 5,
}: RatingFieldProps) => {
  const renderStar = (position: number) => {
    const isHalf = value === position - 0.5;
    const isFilled = value >= position;

    return (
      <button
        type="button"
        className="text-amber-500 hover:text-amber-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        onClick={() => {
          // If clicking the currently active star, reduce by half star
          if (value === position) {
            onChange(position - 0.5);
          } 
          // If clicking the currently active half star, clear it
          else if (value === position - 0.5) {
            onChange(position - 1);
          } 
          // Otherwise set to the clicked position
          else {
            onChange(position);
          }
        }}
        onDoubleClick={() => onChange(0)}
        aria-label={`Rate ${position} out of ${maxRating}`}
      >
        {isHalf ? (
          <StarHalf className="h-6 w-6" />
        ) : isFilled ? (
          <Star className="h-6 w-6" />
        ) : (
          <StarOff className="h-6 w-6" />
        )}
      </button>
    );
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        <span className="text-sm text-muted-foreground">
          {value > 0 ? value : "Not rated"}
        </span>
      </div>
      <div className="flex space-x-1">
        {Array.from({ length: maxRating }, (_, i) => i + 1).map((star) => (
          <React.Fragment key={star}>{renderStar(star)}</React.Fragment>
        ))}
      </div>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default RatingField;
