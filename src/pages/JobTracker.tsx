
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useJobTracker } from "@/hooks/useJobTracker";
import { InterviewGuide, JobStatus } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { PlusCircle, Calendar, FileText } from "lucide-react";
import JobStatusBadge from "@/components/jobs/status/StatusBadge";
import JobBoard from "@/components/jobs/JobBoard";
import JobForm from "@/components/jobs/JobForm";
import { useNavigate } from "react-router-dom";

const JobTracker = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { jobs, isLoading, refreshJobs } = useJobTracker(user?.id);

  const jobsByStatus = (status: JobStatus) => {
    return jobs.filter(job => job.status === status);
  };

  const handleCreateGuide = (jobId: string) => {
    navigate(`/guide/create?jobId=${jobId}`);
  };

  const handleViewCalendar = () => {
    navigate("/calendar");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#141B40]">
      <Header />
      <main className="flex-grow container py-6 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Job Tracker</h1>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={handleViewCalendar}>
              <Calendar className="h-4 w-4 mr-2" />
              Calendar
            </Button>
            <Button onClick={() => setIsFormOpen(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Job
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#1D2448] rounded-lg shadow-sm">
            <h2 className="text-xl font-medium mb-4">Track your job applications</h2>
            <p className="text-muted-foreground mb-6">
              Add jobs you've applied to and track their progress through the interview process.
            </p>
            <Button onClick={() => setIsFormOpen(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Your First Job
            </Button>
          </div>
        ) : (
          <JobBoard
            jobs={jobs}
            onRefresh={refreshJobs}
            onCreateGuide={handleCreateGuide}
          />
        )}

        <JobForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onAddJob={refreshJobs}
          userId={user?.id}
        />
      </main>
      <Footer />
    </div>
  );
};

export default JobTracker;
