import { Button } from 'ui/components/ui/button';
import { Dialog, DialogContent } from 'ui/components/ui/dialog';

type ConfirmGiveUpDialogProps = {
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  handleGiveUp: () => void;
};

/**
 * @description
 * ゲームをギブアップするか確認するダイアログ
 */
export const ConfirmGiveUpDialog = ({
  open,
  handleOpenChange,
  handleGiveUp,
}: ConfirmGiveUpDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <div>ギブアップしますか？</div>
        <Button onClick={handleGiveUp}>ギブアップ</Button>
        <Button onClick={() => handleOpenChange(false)}>キャンセル</Button>
      </DialogContent>
    </Dialog>
  );
};
