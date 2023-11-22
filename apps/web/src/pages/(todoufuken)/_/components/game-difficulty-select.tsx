import { GameDifficulty } from 'schema/dist/todoufuken/game';

import NotchedPaperBurlywoodHovered from '@/assets/notched-paper-burlywood-hovered.png';
import NotchedPaperBurlywoodSelected from '@/assets/notched-paper-burlywood-selected.png';
import NotchedPaperBurlywood from '@/assets/notched-paper-burlywood.png';
import { ImageBgButton } from '@/components/elements/image-bg-button';
import { strictEntries } from '@/utils/strict-entries';

import { LabeledGameDifficulty } from '../config/game';

export type GameDifficultySelectProps = {
  difficulty?: GameDifficulty;
  handleClickGameDifficulty: (difficulty: GameDifficulty) => void;
};

/**
 * @description
 * ゲームの難易度の選択肢を表示するコンポーネント
 */
export const GameDifficultySelect = ({
  difficulty: currentDifficulty,
  handleClickGameDifficulty,
}: GameDifficultySelectProps) => {
  return (
    <>
      {strictEntries(LabeledGameDifficulty).map(([difficulty, label]) => (
        <ImageBgButton
          imagePath={NotchedPaperBurlywood}
          hoverImagePath={NotchedPaperBurlywoodHovered}
          selectedImagePath={NotchedPaperBurlywoodSelected}
          selected={difficulty === currentDifficulty}
          key={difficulty}
          onClick={() => handleClickGameDifficulty(difficulty)}
        >
          {label}
        </ImageBgButton>
      ))}
    </>
  );
};
