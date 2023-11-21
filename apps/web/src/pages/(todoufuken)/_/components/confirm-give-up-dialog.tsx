import { Button } from 'ui/components/ui/button';
import { Dialog, DialogContent } from 'ui/components/ui/dialog';

import NotchedPaperBurlywood from '@/assets/notched-paper-burlywood.png';

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
      <DialogContent
        style={{
          backgroundImage: `url(${NotchedPaperBurlywood})`,
          backgroundSize: '100% 100%',
          backgroundColor: 'transparent',
        }}
        className="border-none shadow-none"
      >
        <div>ギブアップしますか？</div>
        <Button onClick={handleGiveUp}>ギブアップ</Button>
        <Button onClick={() => handleOpenChange(false)}>キャンセル</Button>
      </DialogContent>
    </Dialog>
  );
};
