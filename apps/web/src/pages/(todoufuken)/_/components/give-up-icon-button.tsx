import { Button } from 'ui/components/ui/button';

import GiveUpIcon from '@/assets/icons/give-up.svg?react';

export type GiveUpIconButtonProps = {
  onClick: () => void;
};

export const GiveUpIconButton = ({ onClick }: GiveUpIconButtonProps) => {
  return (
    <Button onClick={onClick} asChild size={'icon'} variant={'ghost'}>
      <GiveUpIcon />
    </Button>
  );
};
