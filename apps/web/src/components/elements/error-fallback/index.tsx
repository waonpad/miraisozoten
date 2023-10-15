import { Button } from 'ui/components/ui/button';

import type { FallbackProps } from 'react-error-boundary';

export const ErrorFallback = ({ error }: FallbackProps) => {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center text-red-500"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <p className="text-sm">{error}</p>
      <p className="text-sm">Please refresh the page</p>
      <Button onClick={() => window.location.assign(window.location.origin)}>Refresh</Button>
    </div>
  );
};
