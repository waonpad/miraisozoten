import { GameDifficulty } from 'schema/dist/todoufuken/game';

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
      <div className="grid grid-cols-2 gap-2 lg:flex lg:flex-col">
        {strictEntries(LabeledGameDifficulty).map(([difficulty, label]) => (
          <ImageBgButton
            imagePath={NotchedPaperBurlywood}
            active={difficulty === currentDifficulty}
            key={difficulty}
            onClick={() => handleClickGameDifficulty(difficulty)}
            className="py-2 lg:py-5 lg:text-2xl"
          >
            {label}
          </ImageBgButton>
        ))}
      </div>
    </>
  );
};
