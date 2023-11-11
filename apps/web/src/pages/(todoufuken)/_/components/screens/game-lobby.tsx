import { useState } from 'react';

import { Prefecture } from 'database';
import { PrefectureResponse } from 'schema/dist/prefecture';
import { Button } from 'ui/components/ui/button';

import { JapanRadioSVGMap } from '@/components/maps/japan-radio-svg-map';
import { usePrefectures } from '@/pages/(prefectures)/_/api/get-prefectures';
import { Link } from '@/router';

import { GameDifficultySelect } from '../../components/game-difficulty-select';
import { GameModeSelect } from '../../components/game-mode-select';
import { PrefectureOverviewDialog } from '../../components/prefecture-overview-dialog';
import { useGame } from '../../hooks/use-game';
import { GameDifficultyInfo } from '../game-difficulty-info';
import { GameModeInfo } from '../game-mode-info';
import { GameSettingSubmit } from '../game-setting-submit';

export const GameLobby = () => {
  const { gameSettings, startGame } = useGame();

  // モードと難易度を決定したら都道府県を選択できるようにする
  const [canSelectPrefectures, setCanSelectPrefectures] = useState(false);

  // 実際に現在選択している都道府県
  const [selectedPrefecture, setSelectedPrefecture] = useState<PrefectureResponse | null>(null);

  // ダイアログに表示している都道府県のID
  const [dialogPrefecture, setDialogPrefecture] = useState<PrefectureResponse | null>(null);

  // ダイアログの開閉状態
  const [dialogOpen, setDialogOpen] = useState(false);

  // ダイアログで隣接県を表示するために毎回リクエストを飛ばすのは遅いので、ここで一括で取得しておく
  // region, neighbors, stats を取得している
  const prefecturesQuery = usePrefectures();

  if (!prefecturesQuery.data) {
    return <div>loading...</div>;
  }

  const handleClickPrefecture = async (e: { target: { id: Prefecture['en'] } }) => {
    const prefectureId = prefecturesQuery.data.find(
      (prefecture) => prefecture.en === e.target.id // svgのidには英語の都道府県名が入っている
    )?.id as number; // 確実に存在することがわかっている

    setDialogPrefecture(
      prefecturesQuery.data.find((prefecture) => prefecture.id === prefectureId) ?? null
    );
    setDialogOpen(true);
  };

  const handleClickSelectPrefecture = (prefecture: PrefectureResponse) => {
    setSelectedPrefecture(prefecture);

    // 選択したらゲームを開始するリクエストを送る
    startGame({
      ...gameSettings,
      prefectureId: prefecture.id,
    });
  };

  return (
    <>
      {/* TODO: プロダクトのロゴを容易して配置する */}

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

      <JapanRadioSVGMap
        selected={selectedPrefecture?.en}
        onLocationClick={handleClickPrefecture}
        disabled={!canSelectPrefectures}
      />

      {dialogPrefecture && (
        <PrefectureOverviewDialog
          prefecture={dialogPrefecture}
          open={dialogOpen}
          handleOpenChange={setDialogOpen}
          handleSelect={handleClickSelectPrefecture}
        />
      )}

      <Button asChild>
        {/* TODO: メニュー画面に戻る */}
        <Link to={'/'}>戻る</Link>
      </Button>
    </>
  );
};
