import React from "react";
import { ErrorBoundary } from "react-error-boundary";

interface ErrorFallbackProps {
  canReset: boolean;
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  canReset,
  error,
  resetErrorBoundary,
}) => {
  return (
    <div role="alert">
      There was an error:{" "}
      <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
      {canReset ? (
        <button onClick={resetErrorBoundary}>Try again</button>
      ) : null}
    </div>
  );
};

interface PokemonErrorBoundaryProps {
  children: React.ReactNode | React.ReactNode[];
  onReset?: () => void;
  resetKeys?: string[];
}

const PokemonErrorBoundary: React.FC<PokemonErrorBoundaryProps> = (
  parentProps
) => {
  const canReset = Boolean(parentProps.onReset || parentProps.resetKeys);
  return (
    <ErrorBoundary
      fallbackRender={(props) => (
        <ErrorFallback canReset={canReset} {...props} />
      )}
      {...parentProps}
    />
  );
};

export default PokemonErrorBoundary;
