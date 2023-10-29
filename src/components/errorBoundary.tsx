import { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from '../models';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error Info:', errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <img className="error-img" src="./src/assets/SW.jpg" />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
