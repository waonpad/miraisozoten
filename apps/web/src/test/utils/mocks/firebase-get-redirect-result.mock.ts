import * as firebase from '@/lib/firebase';

vi.mock('@/lib/firebase', async (importOriginal) => {
  const original = await importOriginal<typeof firebase>();

  return {
    ...original,
    getRedirectResult: () =>
      Promise.resolve(console.warn('テスト環境で利用できないのでモックする')),
  };
});
