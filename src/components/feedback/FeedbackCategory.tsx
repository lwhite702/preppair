
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeedbackCategoryProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  expanded?: boolean;
  toggleExpanded?: () => void;
}

const FeedbackCategory = ({
  title,
  description,
  children,
  className,
  icon,
  expanded = true,
  toggleExpanded,
}: FeedbackCategoryProps) => {
  return (
    <Card className={cn("mb-6", className)}>
      <CardHeader 
        className={cn(
          "pb-2", 
          toggleExpanded && "cursor-pointer hover:bg-accent/50 transition-colors"
        )}
        onClick={toggleExpanded}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon && <span>{icon}</span>}
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          {toggleExpanded && (
            <button type="button" className="text-muted-foreground">
              {expanded ? "−" : "+"}
            </button>
          )}
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      {(expanded || !toggleExpanded) && <CardContent>{children}</CardContent>}
    </Card>
  );
};

export default FeedbackCategory;
