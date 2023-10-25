import { useState } from 'react';

import { Prefecture, Prefectures } from 'prefecture/dist';
import { Button } from 'ui/components/ui/button';

import { GameDifficultySelect } from '../../components/game-difficulty-select';
import { GameModeSelect } from '../../components/game-mode-select';
import { PrefectureOverviewDialog } from '../../components/prefecture-overview-dialog';
import { useGame } from '../../hooks/use-game';
import { GameDifficultyInfo } from '../game-difficulty-info';
import { GameModeInfo } from '../game-mode-info';
import { GameSettingSubmit } from '../game-setting-submit';
import { JapanRadioSVGMap } from '../maps/japan-radio-svg-map';

export const GameLobby = () => {
  const game = useGame();

  const [dialogPrefectureId, setDialogPrefectureId] = useState<Prefecture['id'] | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClickPrefecture = (e: { target: { id: Prefecture['en'] } }) => {
    const prefectureEnName = e.target.id;

    const prefectureId =
      Object.values(Prefectures).find((p) => p.en === prefectureEnName)?.id ?? null;

    setDialogPrefectureId(prefectureId);

    setDialogOpen(true);
  };

  const handleClcikChangeState = () => {
    game.changeStateNext();
  };

  return (
    <>
      <div>{game.data.mode}</div>
      <div>モード</div>
      <GameModeInfo />
      <GameModeSelect game={game.data} handleSelect={game.changeMode} />
      <div>{game.data.difficulty}</div>
      <div>難易度</div>
      <GameDifficultyInfo />
      <GameDifficultySelect game={game.data} handleSelectDifficulty={game.changeDifficulty} />

      {/* TODO: 設定を決定しても戻れるようにする
        (現状Submitしてもロックがかからず都道府県を選択する権利が付与される機能のみ) */}
      <GameSettingSubmit game={game.data} handleSubmit={game.settingCompolete} />

      <Button
        onClick={handleClcikChangeState}
        disabled={!game.data.isSettingCompleted || !game.data.prefecture}
      >
        Next
      </Button>

      <JapanRadioSVGMap
        selected={game.data.prefecture?.en}
        onLocationClick={handleClickPrefecture}
        disabled={!game.data.isSettingCompleted}
      />

      <PrefectureOverviewDialog
        id={dialogPrefectureId}
        open={dialogOpen}
        handleOpenChange={setDialogOpen}
        handleSelect={game.changePrefecture}
      />
    </>
  );
};
