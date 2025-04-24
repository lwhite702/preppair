
import { format, parseISO } from "date-fns";
import { CalendarEvent, FormattedCalendarEvent } from "./types";

export const getEventColor = (type: string): string => {
  switch (type) {
    case "interview":
      return "#3b82f6"; // blue
    case "follow-up":
      return "#8b5cf6"; // violet
    case "reminder":
      return "#f59e0b"; // amber
    default:
      return "#6366f1"; // indigo
  }
};

export const formatCalendarEvents = (events: CalendarEvent[]): FormattedCalendarEvent[] => {
  return events.map(event => ({
    id: event.id,
    title: event.title,
    start: format(parseISO(event.startTime), "yyyy-MM-dd'T'HH:mm:ss"),
    end: event.endTime ? format(parseISO(event.endTime), "yyyy-MM-dd'T'HH:mm:ss") : undefined,
    description: event.description || "",
    className: event.completed ? "opacity-50" : "",
    backgroundColor: getEventColor(event.type),
    textColor: "#ffffff",
    borderColor: getEventColor(event.type),
    extendedProps: {
      type: event.type,
      completed: !!event.completed,
      guideId: event.guideId
    }
  }));
};
