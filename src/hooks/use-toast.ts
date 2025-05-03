
import { toast as sonnerToast } from "sonner";

// Export the toast function from sonner
export const toast = sonnerToast;

// Create our own useToast hook since sonner doesn't export one
export const useToast = () => {
  return {
    toast: sonnerToast,
    // Add any additional functionality needed
    toasts: [] as any[],
  };
};

// Define a type for toast
export type Toast = {
  id: string;
  title?: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  cancel?: React.ReactNode;
  important?: boolean;
  duration?: number;
  variant?: "default" | "destructive" | "success";
};
