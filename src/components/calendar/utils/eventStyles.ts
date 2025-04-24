
export const getEventTypeBadgeClass = (type: string) => {
  switch (type) {
    case "interview":
      return "bg-blue-100 text-blue-800";
    case "follow-up":
      return "bg-violet-100 text-violet-800";
    case "reminder":
      return "bg-amber-100 text-amber-800";
    default:
      return "bg-indigo-100 text-indigo-800";
  }
};

export const getEventTypeLabel = (type: string) => {
  switch (type) {
    case "interview":
      return "Interview";
    case "follow-up":
      return "Follow Up";
    case "reminder":
      return "Reminder";
    default:
      return type.charAt(0).toUpperCase() + type.slice(1);
  }
};

