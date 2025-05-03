
import { toast as sonnerToast, ToasterToast } from "sonner";

// Export the toast function from sonner
export const toast = sonnerToast;

// Create our own useToast hook since sonner doesn't export one
export const useToast = () => {
  return {
    toast: sonnerToast,
    // Add any additional functionality needed
    toasts: [] as ToasterToast[],
  };
};

// Export a type for toast
export type Toast = ToasterToast;
