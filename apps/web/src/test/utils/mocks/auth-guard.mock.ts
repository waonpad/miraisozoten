import * as authGuard from '@/auth/auth-guard';

// useMatchesがそのままだと使えないが,テストに関係ないのでモックする
vi.mock('@/auth/auth-guard', async (importOriginal) => {
  const original = await importOriginal<typeof authGuard>();

  return {
    ...original,
    AuthGuard: ({ children }: { children: React.ReactNode }) => children,
  };
});
