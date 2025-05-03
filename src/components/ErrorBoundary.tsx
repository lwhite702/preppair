
import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  isAuthError(): boolean {
    const { error } = this.state;
    return error?.message?.includes("Auth") || 
           error?.message?.includes("auth") || 
           error?.message?.includes("useAuth") ||
           false;
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // Default error UI with different presentations based on error type
      if (this.isAuthError()) {
        return (
          <div className="min-h-screen flex items-center justify-center p-4">
            <Alert className="max-w-md border-yellow-300 bg-yellow-50">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <AlertTitle className="text-yellow-800">Authentication Error</AlertTitle>
              <AlertDescription className="text-yellow-700">
                <p className="mb-4">
                  There was a problem with authentication. This could be because:
                </p>
                <ul className="list-disc pl-5 mb-4 space-y-1">
                  <li>Your session has expired</li>
                  <li>You need to be signed in to access this page</li>
                  <li>There was a problem with the authentication service</li>
                </ul>
                <div className="flex gap-2 mt-4">
                  <Button 
                    onClick={() => window.location.href = '/auth'}
                    variant="default"
                  >
                    Sign In
                  </Button>
                  <Button 
                    onClick={() => window.location.reload()}
                    variant="outline"
                  >
                    Try Again
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        );
      }
      
      // Generic error UI
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Alert className="max-w-md">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>
              <p className="mb-4">
                {this.state.error?.message || "An unexpected error occurred"}
              </p>
              <Button 
                onClick={() => window.location.reload()}
                variant="outline"
              >
                Try Again
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
