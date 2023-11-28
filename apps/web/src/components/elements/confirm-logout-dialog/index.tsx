import { Dialog, DialogContent } from 'ui/components/ui/dialog';

import NotchedPaperBurlywood from '@/assets/notched-paper-burlywood.png';
import NotchedPaperOrange from '@/assets/notched-paper-orange.png';

import { ImageBgButton } from '../image-bg-button';

export type ConfirmLogoutDialogProps = {
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  handleConfirm: () => void;
};

export const ConfirmLogoutDialog = ({
  open,
  handleOpenChange,
  handleConfirm,
}: ConfirmLogoutDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        style={{
          backgroundImage: `url(${NotchedPaperBurlywood})`,
        }}
        className="min-w-[50vw] max-w-[90vw] border-none bg-transparent bg-[length:100%_100%] p-12 shadow-none sm:rounded-none lg:max-w-fit lg:p-16"
      >
        <div className="text-center text-2xl">ログアウトしますか？</div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-2">
          <ImageBgButton
            imagePath={NotchedPaperOrange}
            onClick={handleConfirm}
            className="py-5 text-xl"
          >
            ログアウト
          </ImageBgButton>
          <ImageBgButton
            imagePath={NotchedPaperOrange}
            onClick={() => handleOpenChange(false)}
            className="py-5 text-xl"
          >
            キャンセル
          </ImageBgButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};
