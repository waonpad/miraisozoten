import { Button } from 'ui/components/ui/button';

export type GiveUpIconButtonProps = {
  onClick: () => void;
};

export const GiveUpIconButton = ({ onClick }: GiveUpIconButtonProps) => {
  return (
    // TODO: アイコンボタンにする
    <Button onClick={onClick}>
      <div>ギブアップ</div>
    </Button>
  );
};
