
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import InterviewCalendar from "@/components/calendar/InterviewCalendar";
import EventModal from "@/components/calendar/EventModal";

const CalendarView = () => {
  const { user } = useAuth();
  const [showEventModal, setShowEventModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#141B40]">
      <Header />
      <main className="flex-grow container py-6 px-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-6 w-6 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold">Interview Calendar</h1>
          </div>
          <Button onClick={() => setShowEventModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>

        <div className="bg-white dark:bg-[#1D2448] rounded-lg shadow-sm p-4">
          <InterviewCalendar />
        </div>

        <EventModal 
          isOpen={showEventModal} 
          onClose={() => setShowEventModal(false)} 
          userId={user?.id}
        />
      </main>
      <Footer />
    </div>
  );
};

export default CalendarView;
