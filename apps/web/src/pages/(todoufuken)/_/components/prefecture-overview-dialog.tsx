import { PrefectureResponse } from 'schema/dist/prefecture';
import { Dialog, DialogContent, DialogFooter } from 'ui/components/ui/dialog';

import NotchedPaperOrangeHovered from '@/assets/notched-paper-orange-hovered.png';
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
            backgroundSize: '100% 100%',
          }}
        >
          <PrefectureSVG prefectureNameEn={prefecture.en} />
          <div>{prefecture.name}</div>
          <div>{prefecture.region?.name}</div>
          {/* スペースが大きくなりすぎる可能性があるため、隣接県は表示しないことにした */}
          {/* <div>隣接</div>
          <div>{(prefecture.neighbors ?? []).map((neighbor) => neighbor.name).join(', ')}</div> */}
          <div>基本データ</div>
          <div>人口: </div>
          <div>面積: </div>
          <DialogFooter>
            <ImageBgButton
              imagePath={NotchedPaperOrange}
              hoverImagePath={NotchedPaperOrangeHovered}
              onClick={() => {
                handleSelect(prefecture);
                handleOpenChange(false);
              }}
            >
              この都道府県にする
            </ImageBgButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
