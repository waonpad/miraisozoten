import { useState } from 'react';

import { Prefecture, Prefectures } from 'prefecture/dist';
import { Button } from 'ui/components/ui/button';

import { GameDifficultySelect } from '../../components/game-difficulty-select';
import { GameModeSelect } from '../../components/game-mode-select';
import { PrefectureOverviewDialog } from '../../components/prefecture-overview-dialog';
import { useGame } from '../../hooks/use-game';
import { JapanRadioSVGMap } from '../maps/japan-radio-svg-map';

export const GameLobby = () => {
  const game = useGame();

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChangeSelectedPrefecture = (e: { target: { id: Prefecture['en'] } }) => {
    const prefectureEnName = e.target.id;

    const prefectureId =
      Object.values(Prefectures).find((p) => p.en === prefectureEnName)?.id ?? null;

    game.changePrefecture(prefectureId);

    setDialogOpen(true);
  };

  return (
    <>
      <div>{game.data.mode}</div>
      <div>モード</div>
      <GameModeSelect game={game.data} handleSelect={game.changeMode} />
      <div>{game.data.difficulty}</div>
      <div>難易度</div>
      <GameDifficultySelect
        game={game.data}
        handleSelectDifficulty={game.changeDifficulty}
        handleSelectDataVisibility={game.changeDataVisibility}
      />
      <div>ダイアログサンプル</div>
      <PrefectureOverviewDialog
        id={game.data.prefecture?.id ?? null}
        open={dialogOpen}
        handleOpenChange={setDialogOpen}
        handleSelect={game.changePrefecture}
      />

      <Button onClick={() => game.changeState('battle')}>Battle</Button>

      <JapanRadioSVGMap handleSelect={handleChangeSelectedPrefecture} />
    </>
  );
};
