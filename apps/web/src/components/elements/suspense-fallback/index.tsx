import { Spinner } from '@/components/elements/spinner';

export const SuspenseFallback = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center" data-testid="loading">
      <Spinner size="xl" />
    </div>
  );
};

/**
 * data-testid="loading" は、テストで使用するためのものです。
 */
