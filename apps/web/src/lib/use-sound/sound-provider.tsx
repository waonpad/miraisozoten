import { SetSoundProvider, useSoundCtx } from './use-sound';

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
  const sound = useSoundCtx();

  return <SetSoundProvider value={sound}>{children}</SetSoundProvider>;
};
