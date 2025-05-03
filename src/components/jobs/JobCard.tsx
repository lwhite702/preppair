
import { formatDistance } from "date-fns";
import { InterviewGuide } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, ExternalLink } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import JobStatusBadge from "./status/StatusBadge";

interface JobCardProps {
  job: InterviewGuide;
  onCreateGuide: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onCreateGuide }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: job.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card 
      ref={setNodeRef} 
      style={style} 
      className="bg-white dark:bg-[#1D2448] shadow-sm border-gray-200 dark:border-gray-700 cursor-grab active:cursor-grabbing"
      {...attributes}
      {...listeners}
    >
      <CardContent className="p-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-base line-clamp-1">{job.jobTitle}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">{job.company}</p>
          </div>
          <JobStatusBadge status={job.status} />
        </div>
        
        <div className="mt-2">
          <p className="text-xs text-muted-foreground">
            Added {formatDistance(new Date(job.createdAt), new Date(), { addSuffix: true })}
          </p>
        </div>
        
        {job.interviewDate && (
          <div className="mt-2 flex items-center text-xs">
            <Calendar className="h-3 w-3 mr-1 text-primary" />
            <span>
              Interview on {new Date(job.interviewDate).toLocaleDateString()}
            </span>
          </div>
        )}
        
        <div className="mt-3 flex justify-between items-center gap-2">
          {job.content ? (
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs h-7 px-2"
              onClick={(e) => {
                e.stopPropagation();
                onCreateGuide();
              }}
            >
              <FileText className="h-3 w-3 mr-1" />
              View Guide
            </Button>
          ) : (
            <Button 
              variant="default" 
              size="sm" 
              className="text-xs h-7 px-2"
              onClick={(e) => {
                e.stopPropagation();
                onCreateGuide();
              }}
            >
              <FileText className="h-3 w-3 mr-1" />
              Create Guide
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            className="text-xs h-7 w-7 p-0"
            onClick={(e) => {
              e.stopPropagation();
              // Open job details page or modal
            }}
          >
            <ExternalLink className="h-3 w-3" />
            <span className="sr-only">View details</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
