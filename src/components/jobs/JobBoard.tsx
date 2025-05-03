
import { useState } from "react";
import { InterviewGuide } from "@/lib/types";
import JobCard from "./JobCard";
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { useJobTracker } from "@/hooks/useJobTracker";
import { useAuth } from "@/contexts/AuthContext";

interface JobBoardProps {
  jobs: InterviewGuide[];
  onRefresh: () => void;
  onCreateGuide: (jobId: string) => void;
}

const JobBoard: React.FC<JobBoardProps> = ({ jobs, onRefresh, onCreateGuide }) => {
  const { user } = useAuth();
  const { updateJobStatus } = useJobTracker(user?.id);
  
  // Define column types and their order
  const columns = [
    { id: 'wishlist', name: 'Wishlist', status: 'applied', bgColor: 'bg-blue-100 dark:bg-blue-900/20' },
    { id: 'interview', name: 'Interviewing', status: 'interview_scheduled', bgColor: 'bg-purple-100 dark:bg-purple-900/20' },
    { id: 'offer', name: 'Offer', status: 'offer_received', bgColor: 'bg-green-100 dark:bg-green-900/20' },
    { id: 'rejected', name: 'Rejected', status: 'rejected', bgColor: 'bg-red-100 dark:bg-red-900/20' },
  ];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!active || !over || active.id === over.id) return;

    const jobId = active.id as string;
    const newStatus = over.id as string;
    
    // Map the column id to the actual status
    const statusColumn = columns.find(col => col.id === newStatus);
    if (!statusColumn) return;
    
    // Update the job status
    const success = await updateJobStatus(jobId, statusColumn.status as any);
    if (success) {
      onRefresh();
    }
  };

  // Filter jobs by status for each column
  const getJobsByStatus = (columnId: string) => {
    switch (columnId) {
      case 'wishlist':
        return jobs.filter(job => job.status === 'applied');
      case 'interview':
        return jobs.filter(job => 
          job.status === 'interview_scheduled' || 
          job.status === 'interview_completed' || 
          job.status === 'feedback_provided' ||
          job.status === 'follow_up_sent'
        );
      case 'offer':
        return jobs.filter(job => job.status === 'offer_received');
      case 'rejected':
        return jobs.filter(job => job.status === 'rejected');
      default:
        return [];
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 mb-8">
        {columns.map((column) => (
          <div key={column.id} className={`rounded-lg p-4 ${column.bgColor}`}>
            <h2 className="font-semibold text-lg mb-3">
              {column.name}
              <span className="ml-2 text-xs font-normal bg-white/50 dark:bg-white/10 px-2 py-1 rounded-full">
                {getJobsByStatus(column.id).length}
              </span>
            </h2>
            
            <SortableContext items={getJobsByStatus(column.id).map(job => job.id)} strategy={horizontalListSortingStrategy}>
              <div className="space-y-3">
                {getJobsByStatus(column.id).map(job => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    onCreateGuide={() => onCreateGuide(job.id)}
                  />
                ))}
                
                {getJobsByStatus(column.id).length === 0 && (
                  <div className="text-center py-8 bg-white/50 dark:bg-white/5 rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Drag jobs here
                    </p>
                  </div>
                )}
              </div>
            </SortableContext>
          </div>
        ))}
      </div>
    </DndContext>
  );
};

export default JobBoard;
