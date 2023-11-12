import { Button } from 'ui/components/ui/button';

import { useGameSettings } from '../hooks/use-game-settings';

export type GameSettingSubmitProps = {
  settings: ReturnType<typeof useGameSettings>['gameSettings'];
  handleSubmit: () => void;
};

/**
 * @description
 * ゲームの難易度とモードの設定完了を確認するコンポーネント
 */
export const GameSettingSubmit = ({ settings, handleSubmit }: GameSettingSubmitProps) => {
  return (
    <>
      <Button disabled={!settings.difficulty || !settings.mode} onClick={handleSubmit}>
        都道府県選択へ
      </Button>
      {!settings.difficulty && <div>難易度を選択してください</div>}
      {!settings.mode && <div>モードを選択してください</div>}
    </>
  );
};
