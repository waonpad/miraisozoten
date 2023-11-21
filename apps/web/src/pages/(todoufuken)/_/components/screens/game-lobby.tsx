import { useState } from 'react';

import { Prefecture } from 'database';
import { PrefectureResponse } from 'schema/dist/prefecture';
import { GameDifficulty, GameMode } from 'schema/dist/todoufuken/game';
import { Button } from 'ui/components/ui/button';

import { Logo } from '@/components/elements/logo';
import { JapanRadioSVGMap } from '@/components/maps/japan-radio-svg-map';
import { usePrefectures } from '@/pages/(prefectures)/_/api/get-prefectures';
import { Link } from '@/router';

import { GameDifficultySelect } from '../../components/game-difficulty-select';
import { GameModeSelect } from '../../components/game-mode-select';
import { PrefectureOverviewDialog } from '../../components/prefecture-overview-dialog';
import { useGameSettings } from '../../hooks/use-game-settings';
import { GameDifficultyInfo } from '../game-difficulty-info';
import { GameModeInfo } from '../game-mode-info';
import { GameSettingSubmit } from '../game-setting-submit';

/**
 * @description
 * ゲームの設定を行う画面
 */
export const GameLobby = () => {
  const { gameSettings, setGameSettings, startGame } = useGameSettings();

  /**
   * @description
   * 都道府県の選択可否を管理するフラグ
   * モードと難易度を決定したら有効になる
   */
  const [canSelectPrefectures, setCanSelectPrefectures] = useState(false);

  /**
   * @description
   * ダイアログに表示する都道府県
   */
  const [dialogPrefecture, setDialogPrefecture] = useState<PrefectureResponse>();

  /**
   * @description
   * このクエリで、ゲーム中に必要な全ての静的データが取得される \
   * これ以降はキャッシュから取得されるため、静的データを参照する際のローディングが発生しない
   */
  const prefecturesQuery = usePrefectures();
  const prefectures = prefecturesQuery.data!; // Suspenseでローディングを表示しているため、存在が保証されている

  /**
   * @description
   * 地図上で都道府県をクリックしたら、ダイアログを表示する
   */
  const handleClickPrefecture = async (e: { target: { id: Prefecture['en'] } }) => {
    setDialogPrefecture(prefectures.find((prefecture) => prefecture.en === e.target.id));
  };

  /**
   * @description
   * ダイアログで表示している都道府県を選択したら、ゲームを開始するリクエストを送る
   */
  const handleClickSelectPrefecture = (prefecture: PrefectureResponse) => {
    startGame({ ...gameSettings, prefectureId: prefecture.id });
  };

  const handleClickGameDifficulty = (difficulty: GameDifficulty) => {
    setGameSettings((prev) => ({ ...prev, difficulty }));
  };

  const handleClickGameMode = (mode: GameMode) => {
    setGameSettings((prev) => ({ ...prev, mode }));
  };

  const handleClickGameSettingsSubmit = () => setCanSelectPrefectures(true);

  return (
    <>
      <Logo />

      <div>{gameSettings.mode}</div>
      <div>モード</div>
      <GameModeInfo />
      <GameModeSelect mode={gameSettings.mode} handleClickGameMode={handleClickGameMode} />
      <div>{gameSettings.difficulty}</div>
      <div>難易度</div>
      <GameDifficultyInfo />
      <GameDifficultySelect
        difficulty={gameSettings.difficulty}
        handleClickGameDifficulty={handleClickGameDifficulty}
      />
      <div>{gameSettings.prefectureId}</div>

      {/* Submitしてもロックがかからず都道府県を選択する権利が付与される機能のみ */}
      <GameSettingSubmit settings={gameSettings} handleSubmit={handleClickGameSettingsSubmit} />

      <JapanRadioSVGMap onLocationClick={handleClickPrefecture} disabled={!canSelectPrefectures} />

      {dialogPrefecture && (
        <PrefectureOverviewDialog
          prefecture={dialogPrefecture}
          open={!!dialogPrefecture}
          handleOpenChange={() => setDialogPrefecture(undefined)}
          handleSelect={handleClickSelectPrefecture}
        />
      )}

      <Button asChild>
        <Link to={'/menu'}>戻る</Link>
      </Button>
    </>
  );
};
