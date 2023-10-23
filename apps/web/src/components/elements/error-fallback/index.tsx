import { Button } from 'ui/components/ui/button';

type ErrorFallbackProps = {
  error: Error;
  componentStack: string;
  eventId: string;
  resetError(): void;
};

export const ErrorFallback = ({ error }: ErrorFallbackProps): React.ReactElement => {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center text-red-500"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <p className="text-sm">{error.message}</p>
      <p className="text-sm">Please refresh the page</p>
      <Button onClick={() => window.location.assign(window.location.origin)}>Refresh</Button>
    </div>
  );
};
