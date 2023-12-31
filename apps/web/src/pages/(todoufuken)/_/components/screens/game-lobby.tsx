import { useEffect, useState } from 'react';

import { Prefecture } from 'database';
import { PrefectureResponse } from 'schema/dist/prefecture';
import { GameDifficulty, GameMode } from 'schema/dist/todoufuken/game';

import { Logo } from '@/components/elements/logo';
import { SoundToggleIconButton } from '@/components/elements/sound-toggle-icon-button';
import { JapanRadioSVGMap } from '@/components/maps/japan-radio-svg-map';
import { useFadeTransition } from '@/components/transitions/fade-transition/use-fade-transition';
import { useSound } from '@/lib/use-sound/use-sound';
import { usePrefectures } from '@/pages/(prefectures)/_/api/get-prefectures';

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
  const fadeTransition = useFadeTransition();

  const { gameSettings, setGameSettings, startGame } = useGameSettings();

  const { playClick, playDisabledClick, playOpenDialog, playCloseDialog, playPageMove } =
    useSound();

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
    playOpenDialog();

    setDialogPrefecture(prefectures.find((prefecture) => prefecture.en === e.target.id));
  };

  /**
   * @description
   * ダイアログで表示している都道府県を選択したら、ゲームを開始するリクエストを送る
   */
  const handleClickSelectPrefecture = (prefecture: PrefectureResponse) => {
    playPageMove();

    startGame({ ...gameSettings, prefectureId: prefecture.id });
  };

  const handleClickGameDifficulty = (difficulty: GameDifficulty) => {
    playClick();

    setGameSettings((prev) => ({ ...prev, difficulty }));
  };

  const handleClickGameMode = (mode: GameMode) => {
    playClick();

    setGameSettings((prev) => ({ ...prev, mode }));
  };

  const handleClickGameSettingsSubmit = () => {
    playClick();

    setCanSelectPrefectures(true);
  };

  const handleClickDisabledMap = () => {
    playDisabledClick();
  };

  const handleOpenChangePrefectureDialog = (open: boolean) => {
    if (!open) {
      playCloseDialog();

      setDialogPrefecture(undefined);
    }
  };

  useEffect(() => {
    if (!fadeTransition.isOpen) {
      fadeTransition.openFade();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // TODO: 設定を決定したら選択した設定以外と決定ボタンを非表示にする
    // TODO: 設定を決定するまでは地図のホバーで何もしないようにする
    <>
      <div className="relative grid h-screen grid-cols-1 gap-1 p-2 lg:grid-cols-2 lg:p-3">
        <Logo wrapperProps={{ className: 'absolute left-2 top-2 h-12 w-12 lg:h-28 lg:w-28' }} />
        <div className="mt-2 grid h-fit grid-cols-1 gap-2 lg:ml-6 lg:mt-40 lg:grid-cols-2 lg:gap-6">
          <div>
            <div className="flex items-center justify-center gap-1 lg:justify-start">
              <span className="text-3xl">難易度</span>
              <GameDifficultyInfo />
            </div>
            <div className="mt-1 lg:ml-3">
              <GameDifficultySelect
                difficulty={gameSettings.difficulty}
                handleClickGameDifficulty={handleClickGameDifficulty}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1 lg:justify-start">
              <span className="text-3xl">モード</span>
              <GameModeInfo />
            </div>
            <div className="mt-1 lg:ml-3">
              <GameModeSelect mode={gameSettings.mode} handleClickGameMode={handleClickGameMode} />
            </div>
          </div>

          {/* 設定の決定を右に置くためのダミー */}
          <div></div>

          {/* 設定決定ボタン */}
          <div className="lg:ml-3">
            <GameSettingSubmit
              settings={gameSettings}
              handleSubmit={handleClickGameSettingsSubmit}
            />
          </div>
        </div>

        {/* 都道府県選択エリア */}
        <div
          className="min-h-full"
          onClick={canSelectPrefectures ? undefined : handleClickDisabledMap}
        >
          <JapanRadioSVGMap
            onLocationClick={handleClickPrefecture}
            disabled={!canSelectPrefectures}
            relocation={{ okinawa: true }}
          />
        </div>
      </div>

      <SoundToggleIconButton className="absolute right-2 top-2" />

      {/* ダイアログ */}
      {dialogPrefecture && (
        <PrefectureOverviewDialog
          prefecture={dialogPrefecture}
          open={!!dialogPrefecture}
          handleOpenChange={handleOpenChangePrefectureDialog}
          handleSelect={handleClickSelectPrefecture}
        />
      )}
    </>
  );
};
