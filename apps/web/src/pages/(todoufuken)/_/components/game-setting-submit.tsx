import NotchedPaperOrangeDisabled from '@/assets/notched-paper-orange-disabled.png';
import NotchedPaperOrangeHovered from '@/assets/notched-paper-orange-hovered.png';
import NotchedPaperOrange from '@/assets/notched-paper-orange.png';
import { ImageBgButton } from '@/components/elements/image-bg-button';

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
      <ImageBgButton
        imagePath={NotchedPaperOrange}
        hoverImagePath={NotchedPaperOrangeHovered}
        disabledImagePath={NotchedPaperOrangeDisabled}
        disabled={!settings.difficulty || !settings.mode}
        onClick={handleSubmit}
      >
        都道府県選択へ
      </ImageBgButton>
      {!settings.difficulty && <div>難易度を選択してください</div>}
      {!settings.mode && <div>モードを選択してください</div>}
    </>
  );
};
