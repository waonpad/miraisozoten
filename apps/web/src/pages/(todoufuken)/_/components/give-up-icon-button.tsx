import { Button } from 'ui/components/ui/button';

import GiveUpIcon from '@/assets/icons/give-up.svg?react';

export type GiveUpIconButtonProps = {
  onClick: () => void;
};

export const GiveUpIconButton = ({ onClick }: GiveUpIconButtonProps) => {
  return (
    <Button onClick={onClick} asChild size={'icon'} variant={'icon'} className="h-7 w-7">
      <GiveUpIcon className="fill-white" />
    </Button>
  );
};
