import { Button } from 'ui/components/ui/button';

export const GiveUpIconButton = ({ onClick }: { onClick: () => void }) => {
  return (
    // TODO: アイコンボタンにする
    <Button onClick={onClick}>
      <div>ギブアップ</div>
    </Button>
  );
};
