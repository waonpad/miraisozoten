import { PrefectureStatsConfig } from 'schema/dist/prefecture/stats';
import { GameResponse } from 'schema/dist/todoufuken/game';
import { Dialog, DialogContent } from 'ui/components/ui/dialog';

type ConqueredPrefecturesDialogProps = {
  game: GameResponse;
  open: boolean;
  handleOpenChange: (open: boolean) => void;
};

/**
 * @description
 * ゲームをギブアップするか確認するダイアログ
 */
export const ConqueredPrefecturesDialog = ({
  game,
  open,
  handleOpenChange,
}: ConqueredPrefecturesDialogProps) => {
  // TODO: ヘッダーの制覇数の文字列から吹き出しのようにダイアログを出すようにする
  // TODO: ダイアログの上辺は常にヘッダーの下辺から少し下に位置し、画面の中心＝ダイアログの中心にはならないようにする
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex max-h-[80vh] min-w-[90vw] max-w-[90vw] flex-col gap-0 border-none p-0 sm:rounded-none">
        <div className="flex items-center justify-center bg-gray-300 py-4 text-xl lg:text-2xl">
          吸収都道府県
        </div>
        <div className="custom-scroll-bar grow overflow-scroll overflow-x-hidden border-4 border-t-0 border-gray-300 bg-white">
          <ul>
            {game.logs.map((log) => (
              <li key={log.id} className="flex items-center justify-center p-2 text-xl">
                <span>{`${log.opponent.name} (${
                  PrefectureStatsConfig[log.factorName].label
                })`}</span>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};
