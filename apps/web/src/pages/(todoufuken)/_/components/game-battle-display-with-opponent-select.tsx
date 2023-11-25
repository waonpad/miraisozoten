import { PrefectureResponse } from 'schema/dist/prefecture';
import { GameResponse } from 'schema/dist/todoufuken/game';

import NotchedPaperBurlywood from '@/assets/notched-paper-burlywood.png';
import { ImageBgContainer } from '@/components/containers/image-bg-container';
import { PrefectureSVG } from '@/components/maps/prefecture-svg';

export type GameBattleDisplayWithOpponentSelectProps = {
  prefecture: PrefectureResponse;
  neighbors: GameResponse['neighbors'];
  disabled: boolean;
  handleClickSelectOpponent: (opponentId: number) => void;
};

/**
 * @description
 * 選択された見方側の都道府県と、 \
 * ターンの相手となる都道府県を選択するエリアを表示するコンポーネント
 */
export const GameBattleDisplayWithOpponentSelect = ({
  prefecture,
  neighbors,
  disabled,
  handleClickSelectOpponent,
}: GameBattleDisplayWithOpponentSelectProps) => {
  return (
    <>
      <div className="flex lg:px-20">
        {/* 自分側の都道府県を表示するエリア */}
        <div className="flex flex-1 flex-col">
          <ImageBgContainer
            imagePath={NotchedPaperBurlywood}
            className="mb-2 py-2 text-xl lg:py-5 lg:text-2xl"
          >
            {prefecture.name}
          </ImageBgContainer>
          <div className="h-48 sm:h-80">
            <PrefectureSVG prefectureNameEn={prefecture.en} className="h-full" />
          </div>
        </div>
        <div className="flex items-center justify-center px-4 text-3xl font-bold lg:px-20">VS</div>
        {/* 相手県を選択するエリア */}
        {/* TODO: リストで表示する */}
        <div className="flex flex-1 flex-col">
          <ImageBgContainer
            imagePath={NotchedPaperBurlywood}
            className="mb-2 py-2 sm:text-xl lg:py-5 lg:text-2xl"
          >
            対戦する都道府県
          </ImageBgContainer>
          <div
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className="custom-scroll-bar h-48 overflow-scroll overflow-x-hidden border-4 border-gray-400 bg-white/40 sm:h-80"
          >
            <ul
              className={`divide-y divide-gray-700 ${
                disabled ? 'pointer-events-none opacity-50' : ''
              }`}
            >
              {neighbors.map((neighbor) => (
                <li
                  key={neighbor.id}
                  className="flex h-10 items-center justify-center text-xl hover:bg-gray-400/40 sm:h-16 lg:text-2xl"
                >
                  <div onClick={() => handleClickSelectOpponent(neighbor.id)}>{neighbor.name}</div>
                </li>
              ))}
              {/* divideを出すためのダミー */}
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
