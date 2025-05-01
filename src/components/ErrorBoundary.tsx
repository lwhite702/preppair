
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: undefined });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="flex flex-col items-center justify-center p-8 bg-red-50 border border-red-200 rounded-lg my-4 text-center">
          <h2 className="text-xl font-semibold text-red-700 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">We apologize for the inconvenience. Please try again later.</p>
          <Button 
            onClick={this.resetErrorBoundary}
            variant="outline" 
            className="border-red-300 text-red-700 hover:bg-red-100"
          >
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
