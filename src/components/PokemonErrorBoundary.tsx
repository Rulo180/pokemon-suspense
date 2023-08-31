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
    <div role="alert" className="h-full flex flex-col justify-center items-center py-6">
      <figure>
        <img
          src="/images/pikachu-sad.png"
          alt="Sad pikachu"
          width={300}
        />
      </figure>
      <div className="px-6 py-4 rounded bg-slate-100 text-center space-y-1">
        <div className="pb-4">
          <h2 className="text-xl text-primary font-bold">
            Something wrong here...
          </h2>
        </div>
        <p>Sorry. We are having technical issues (as you can see).</p>
        <p>Try to refresh the page, sometimes works :)</p>
        {canReset ? (
          <button onClick={resetErrorBoundary}>Try again</button>
        ) : null}
        <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
      </div>
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
