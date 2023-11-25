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
      <div className="grid grid-cols-1">
        <ImageBgButton
          imagePath={NotchedPaperOrange}
          disabled={!settings.difficulty || !settings.mode}
          onClick={handleSubmit}
          className="py-2 text-xl lg:py-5 lg:text-2xl"
        >
          都道府県選択へ
        </ImageBgButton>
      </div>
      <div className="mt-2 grid grid-cols-1 gap-1 text-red-500"></div>
      {/* 選択されていないときの警告は直にテキストを置くより別の方法で出したほうがよさそう */}
    </>
  );
};
