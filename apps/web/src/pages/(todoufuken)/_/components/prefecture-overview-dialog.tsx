import { PrefectureResponse } from 'schema/dist/prefecture';
import { Dialog, DialogContent, DialogFooter } from 'ui/components/ui/dialog';

import NotchedPaperOrange from '@/assets/notched-paper-orange.png';
import PaperOrange from '@/assets/paper-orange.jpg';
import { ImageBgButton } from '@/components/elements/image-bg-button';
import { PrefectureSVG } from '@/components/maps/prefecture-svg';

export type PrefectureOverviewDialogProps = {
  prefecture: PrefectureResponse;
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  handleSelect: (prefecture: PrefectureResponse) => void;
};

/**
 * @description
 * ゲームの設定画面で、都道府県の概要を表示するダイアログ
 */
export const PrefectureOverviewDialog = ({
  prefecture,
  open,
  handleOpenChange,
  handleSelect,
}: PrefectureOverviewDialogProps) => {
  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          style={{
            backgroundImage: `url(${PaperOrange})`,
          }}
          className="max-w-[90vw] border-none bg-[length:100%_100%] sm:rounded-none lg:max-w-fit"
        >
          <div className="grid gap-6">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <PrefectureSVG prefectureNameEn={prefecture.en} />
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <div className="text-3xl">{prefecture.name}</div>
                <div>{prefecture.region?.name}地方</div>
              </div>
            </div>
            <div>
              <div className="text-3xl">基本データ</div>
              <div className="text-xl">人口: {prefecture.stats.population} 人</div>
              <div className="text-xl">面積: {prefecture.stats.area} km²</div>
            </div>
          </div>
          <DialogFooter className="sm:flex-col sm:justify-center">
            <ImageBgButton
              imagePath={NotchedPaperOrange}
              onClick={() => {
                handleSelect(prefecture);
                handleOpenChange(false);
              }}
              className="py-5 lg:text-xl"
            >
              この都道府県にする
            </ImageBgButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
