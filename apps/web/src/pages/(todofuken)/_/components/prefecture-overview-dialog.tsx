import { PrefectureResponse } from 'schema/dist/prefecture';
import { Button } from 'ui/components/ui/button';
import { Dialog, DialogContent, DialogFooter } from 'ui/components/ui/dialog';

export type PrefectureOverviewDialogProps = {
  prefecture: PrefectureResponse;
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  handleSelect: (prefecture: PrefectureResponse) => void;
};

export const PrefectureOverviewDialog = ({
  prefecture,
  open,
  handleOpenChange,
  handleSelect,
}: PrefectureOverviewDialogProps) => {
  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <div>svgを配置</div>
          <div>{prefecture.name}</div>
          <div>{prefecture.region?.name}</div>
          <div>隣接</div>
          <div>{(prefecture.neighbors ?? []).map((neighbor) => neighbor.name).join(', ')}</div>
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
