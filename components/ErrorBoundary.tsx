import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="max-w-md w-full bg-white rounded-2xl border border-red-100 shadow-sm p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>

            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Something went wrong
            </h2>

            <p className="text-slate-600 mb-6">
              An unexpected error occurred. Please try again or refresh the page.
            </p>

            {this.state.error && (
              <details className="text-left mb-6 p-4 bg-slate-50 rounded-lg">
                <summary className="text-sm font-medium text-slate-700 cursor-pointer">
                  Error details
                </summary>
                <pre className="mt-2 text-xs text-red-600 overflow-auto max-h-32">
                  {this.state.error.message}
                </pre>
              </details>
            )}

            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => (
  <div className="rounded-xl bg-red-50 border border-red-100 p-6 text-center">
    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
      <AlertTriangle className="w-6 h-6 text-red-500" />
    </div>
    <p className="text-red-700 font-medium mb-4">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Retry
      </button>
    )}
  </div>
);
