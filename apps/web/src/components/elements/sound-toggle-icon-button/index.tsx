import { Button } from 'ui/components/ui/button';
import { cn } from 'ui/lib/utils';

import VolumeHighIcon from '@/assets/icons/volume-high.svg?react';
import VolumeXmarkIcon from '@/assets/icons/volume-xmark.svg?react';
import { useSound } from '@/lib/use-sound/use-sound';

export type SoundToggleIconButtonProps = {
  svgProps?: React.SVGProps<SVGSVGElement>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const SoundToggleIconButton = ({ svgProps, ...props }: SoundToggleIconButtonProps) => {
  const { options, toggleSoundEnabled } = useSound();

  const isSoundEnabled = options.soundEnabled;

  const handleClickToggleSoundEnabled = () => {
    toggleSoundEnabled();
  };

  return (
    <Button
      {...props}
      onClick={handleClickToggleSoundEnabled}
      asChild
      size={'icon'}
      variant={'icon'}
      className={cn('cursor-pointer h-7 w-7', props.className)}
    >
      {isSoundEnabled ? <VolumeHighIcon {...svgProps} /> : <VolumeXmarkIcon {...svgProps} />}
    </Button>
  );
};
