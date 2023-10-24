import { PrefectureId, Prefectures } from 'prefecture/dist';
import { getPrefectureNeighbors } from 'prefecture/dist/utils';
import { Button } from 'ui/components/ui/button';
import { Dialog, DialogContent, DialogFooter } from 'ui/components/ui/dialog';

export type PrefectureOverviewDialogProps = {
  id: PrefectureId | null;
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  handleSelect: (id: PrefectureId) => void;
};

export const PrefectureOverviewDialog = ({
  id,
  open,
  handleOpenChange,
  handleSelect,
}: PrefectureOverviewDialogProps) => {
  if (!id) return null;

  const prefecture = getPrefectureNeighbors([Prefectures[id]])[0];

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <div>svgを配置</div>
          <div>{prefecture.name}</div>
          <div>{prefecture.area.name}</div>
          <div>隣接</div>
          <div>{prefecture.neighbors.map((neighbor) => neighbor.name).join(', ')}</div>
          <div>基本データ</div>
          <div>基本データを表示</div>
          <div>人口: </div>
          <div>面積: </div>
          <DialogFooter>
            <Button onClick={() => handleSelect(id)}>Select</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
