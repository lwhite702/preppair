// src/components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  errorMessage?: string;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Component error:", error, errorInfo);
    // Example: Send error to a logging service
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex-grow flex items-center justify-center" role="alert">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg border border-gray-200 max-w-md">
            <div className="bg-red-100 rounded-full p-3 inline-block mb-4">
              <AlertTriangle className="text-red-600 h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold mb-4">Something went wrong</h1>
            <p className="text-muted-foreground mb-6">
              {this.props.errorMessage || "We're sorry, but there was an error loading this component."}
            </p>
            <button 
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return (
      <React.Fragment key={this.state.hasError ? "error" : "normal"}>
        {this.props.children}
      </React.Fragment>
    );
  }
}

export default ErrorBoundary;
