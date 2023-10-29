import { useState } from 'react';

import { Prefecture } from 'database';
import { Button } from 'ui/components/ui/button';

import { usePrefectures } from '../../api/get-prefectures';
import { GameDifficultySelect } from '../../components/game-difficulty-select';
import { GameModeSelect } from '../../components/game-mode-select';
import { PrefectureOverviewDialog } from '../../components/prefecture-overview-dialog';
import { useGame } from '../../hooks/use-game';
import { GameDifficultyInfo } from '../game-difficulty-info';
import { GameModeInfo } from '../game-mode-info';
import { GameSettingSubmit } from '../game-setting-submit';
import { JapanRadioSVGMap } from '../maps/japan-radio-svg-map';

export const GameLobby = () => {
  const { gameSettings, setGameSettings, startGame } = useGame();

  // モードと難易度を決定したら都道府県を選択できるようにする
  const [canSelectPrefectures, setCanSelectPrefectures] = useState(false);

  // 実際に現在選択している都道府県
  const [selectedPrefecture, setSelectedPrefecture] = useState<Prefecture | null>(null);

  // ダイアログに表示している都道府県のID
  const [dialogPrefectureId, setDialogPrefectureId] = useState<Prefecture['id'] | null>(null);

  // ダイアログの開閉状態
  const [dialogOpen, setDialogOpen] = useState(false);

  // ダイアログで隣接県を表示するために毎回リクエストを飛ばしているので、
  // ここで一括で取得したほうが負荷的にもUX的にも良さそう
  const prefecturesQuery = usePrefectures();

  const handleClickPrefecture = async (e: { target: { id: Prefecture['en'] } }) => {
    const prefectureId = prefecturesQuery.data?.find(
      (prefecture) => prefecture.en === e.target.id // svgのidには英語の都道府県名が入っている
    )?.id as number; // 確実に存在することがわかっている

    setDialogPrefectureId(prefectureId);
    setDialogOpen(true);
  };

  const handleClickSelectPrefecture = (prefecture: Prefecture) => {
    setSelectedPrefecture(prefecture);

    setGameSettings((prev) => ({
      ...prev,
      prefectureId: prefecture?.id,
    }));
  };

  const handleClickStartGame = () => {
    startGame();
  };

  return (
    <>
      <div>{gameSettings.mode}</div>
      <div>モード</div>
      <GameModeInfo />
      <GameModeSelect />
      <div>{gameSettings.difficulty}</div>
      <div>難易度</div>
      <GameDifficultyInfo />
      <GameDifficultySelect />
      <div>{gameSettings.prefectureId}</div>

      {/* TODO: 設定を決定しても戻れるようにする
        (現状Submitしてもロックがかからず都道府県を選択する権利が付与される機能のみ) */}
      <GameSettingSubmit handleSubmit={() => setCanSelectPrefectures(true)} />

      <Button onClick={handleClickStartGame} disabled={!selectedPrefecture}>
        Next
      </Button>

      <JapanRadioSVGMap
        selected={selectedPrefecture?.en}
        onLocationClick={handleClickPrefecture}
        disabled={!canSelectPrefectures}
      />

      {dialogPrefectureId && (
        <PrefectureOverviewDialog
          id={dialogPrefectureId}
          open={dialogOpen}
          handleOpenChange={setDialogOpen}
          handleSelect={handleClickSelectPrefecture}
        />
      )}
    </>
  );
};
