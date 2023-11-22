import { Dialog, DialogContent } from 'ui/components/ui/dialog';

import NotchedPaperBurlywood from '@/assets/notched-paper-burlywood.png';
import NotchedPaperOrangeHovered from '@/assets/notched-paper-orange-hovered.png';
import NotchedPaperOrange from '@/assets/notched-paper-orange.png';
import { ImageBgButton } from '@/components/elements/image-bg-button';

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
        <ImageBgButton
          imagePath={NotchedPaperOrange}
          hoverImagePath={NotchedPaperOrangeHovered}
          onClick={handleGiveUp}
        >
          はい
        </ImageBgButton>
        <ImageBgButton
          imagePath={NotchedPaperOrange}
          hoverImagePath={NotchedPaperOrangeHovered}
          onClick={() => handleOpenChange(false)}
        >
          いいえ
        </ImageBgButton>
      </DialogContent>
    </Dialog>
  );
};
