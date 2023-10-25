import { Button } from 'ui/components/ui/button';

import { Game } from '../config/game';

export type GameSettingSubmitProps = {
  game: Game;
  handleSubmit: () => void;
};

export const GameSettingSubmit = ({ game, handleSubmit }: GameSettingSubmitProps) => {
  return (
    <>
      <Button disabled={!game.difficulty || !game.mode} onClick={handleSubmit}>
        都道府県選択へ
      </Button>
      {!game.difficulty && <div>難易度を選択してください</div>}
      {!game.mode && <div>モードを選択してください</div>}
    </>
  );
};
