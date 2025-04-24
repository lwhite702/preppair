
import { CalendarEvent } from "@/lib/types";

export { CalendarEvent };

export interface FormattedCalendarEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  description: string;
  className: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  extendedProps: {
    type: string;
    completed: boolean;
    guideId?: string;
  };
}

export interface UseCalendarReturn {
  events: CalendarEvent[];
  formattedEvents: FormattedCalendarEvent[];
  isLoading: boolean;
  isUpdating: boolean;
  fetchEvents: () => Promise<void>;
  addEvent: (event: Omit<CalendarEvent, "id" | "userId" | "completed">) => Promise<string | null>;
  updateEvent: (id: string, updates: Partial<Omit<CalendarEvent, "id" | "userId">>) => Promise<boolean>;
  deleteEvent: (id: string) => Promise<boolean>;
  markEventCompleted: (id: string, completed?: boolean) => Promise<boolean>;
  getUpcomingEvents: (days?: number) => CalendarEvent[];
}
