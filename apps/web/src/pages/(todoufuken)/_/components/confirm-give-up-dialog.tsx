import { Dialog, DialogContent } from 'ui/components/ui/dialog';

import NotchedPaperBurlywood from '@/assets/notched-paper-burlywood.png';
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
        }}
        className="min-w-[50vw] max-w-[90vw] border-none bg-transparent bg-[length:100%_100%] p-12 shadow-none sm:rounded-none lg:max-w-fit lg:p-16"
      >
        <div className="text-center text-2xl">ギブアップしますか？</div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-2">
          <ImageBgButton
            imagePath={NotchedPaperOrange}
            onClick={handleGiveUp}
            className="py-5 lg:text-xl"
          >
            はい
          </ImageBgButton>
          <ImageBgButton
            imagePath={NotchedPaperOrange}
            onClick={() => handleOpenChange(false)}
            className="py-5 lg:text-xl"
          >
            いいえ
          </ImageBgButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};
