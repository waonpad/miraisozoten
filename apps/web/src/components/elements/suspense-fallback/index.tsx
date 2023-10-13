import { Spinner } from '@/components/elements/spinner';

export const SuspenseFallback = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Spinner size="xl" />
    </div>
  );
};
