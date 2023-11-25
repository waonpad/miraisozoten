import { GameMode } from 'schema/dist/todoufuken/game';

import NotchedPaperBurlywood from '@/assets/notched-paper-burlywood.png';
import { ImageBgButton } from '@/components/elements/image-bg-button';
import { strictEntries } from '@/utils/strict-entries';

import { LabeledGameMode } from '../config/game';

export type GameModeSelectProps = {
  mode?: GameMode;
  handleClickGameMode: (mode: GameMode) => void;
};

/**
 * @description
 * ゲームのモードの選択肢を表示するコンポーネント
 */
export const GameModeSelect = ({ mode: currentMode, handleClickGameMode }: GameModeSelectProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-2 lg:flex lg:flex-col">
        {strictEntries(LabeledGameMode).map(([mode, label]) => (
          <ImageBgButton
            imagePath={NotchedPaperBurlywood}
            active={mode === currentMode}
            key={mode}
            onClick={() => handleClickGameMode(mode)}
            className="py-2 lg:py-5 lg:text-2xl"
          >
            {label}
          </ImageBgButton>
        ))}
      </div>
    </>
  );
};
