import { Prefecture } from 'database';
import { Button } from 'ui/components/ui/button';
import { Dialog, DialogContent, DialogFooter } from 'ui/components/ui/dialog';

import { usePrefecture } from '../api/get-prefecture';
import { usePrefectureNeighbors } from '../api/get-prefecture-neighbors';

export type PrefectureOverviewDialogProps = {
  id: Prefecture['id'];
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  handleSelect: (prefecture: Prefecture) => void;
};

export const PrefectureOverviewDialog = ({
  id,
  open,
  handleOpenChange,
  handleSelect,
}: PrefectureOverviewDialogProps) => {
  const prefectureQuery = usePrefecture({ id });

  const neighborsQuery = usePrefectureNeighbors({ id });

  const prefecture = prefectureQuery.data;

  const neighbors = neighborsQuery.data;

  // ロードされるまでnullを返す
  if (!prefecture || !neighbors) {
    return null;
  }

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <div>svgを配置</div>
          <div>{prefecture?.name}</div>
          <div>{prefecture?.region?.name}</div>
          <div>隣接</div>
          <div>{(neighbors ?? []).map((neighbor) => neighbor.name).join(', ')}</div>
          <div>基本データ</div>
          <div>基本データを表示</div>
          <div>人口: </div>
          <div>面積: </div>
          <DialogFooter>
            <Button
              onClick={() => {
                handleSelect(prefecture);
                handleOpenChange(false);
              }}
            >
              この都道府県にする
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
