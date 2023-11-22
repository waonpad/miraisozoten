import { GameMode } from 'schema/dist/todoufuken/game';

import NotchedPaperBurlywoodHovered from '@/assets/notched-paper-burlywood-hovered.png';
import NotchedPaperBurlywoodSelected from '@/assets/notched-paper-burlywood-selected.png';
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
      {strictEntries(LabeledGameMode).map(([mode, label]) => (
        <ImageBgButton
          imagePath={NotchedPaperBurlywood}
          hoverImagePath={NotchedPaperBurlywoodHovered}
          selectedImagePath={NotchedPaperBurlywoodSelected}
          selected={mode === currentMode}
          key={mode}
          onClick={() => handleClickGameMode(mode)}
        >
          {label}
        </ImageBgButton>
      ))}
    </>
  );
};
