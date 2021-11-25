import React, { ReactNode, Suspense, SuspenseProps } from 'react';

export interface ModuleLoaderProps extends SuspenseProps {
  errorFallback?: ReactNode;
}

class ModuleLoader extends React.Component<
  ModuleLoaderProps,
  { hasError: boolean }
> {
  constructor(props: ModuleLoaderProps) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { fallback, children, errorFallback } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return <>{errorFallback || 'Erro ao carregar módulo federado'}</>;
    }

    return <Suspense fallback={fallback}>{children}</Suspense>;
  }
}

export default ModuleLoader;
