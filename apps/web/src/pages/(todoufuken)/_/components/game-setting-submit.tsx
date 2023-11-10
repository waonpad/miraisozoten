import { Button } from 'ui/components/ui/button';

import { useGame } from '../hooks/use-game';

export type GameSettingSubmitProps = {
  handleSubmit: () => void;
};

export const GameSettingSubmit = ({ handleSubmit }: GameSettingSubmitProps) => {
  const { gameSettings } = useGame();

  return (
    <>
      <Button disabled={!gameSettings?.difficulty || !gameSettings.mode} onClick={handleSubmit}>
        都道府県選択へ
      </Button>
      {!gameSettings?.difficulty && <div>難易度を選択してください</div>}
      {!gameSettings?.mode && <div>モードを選択してください</div>}
    </>
  );
};
