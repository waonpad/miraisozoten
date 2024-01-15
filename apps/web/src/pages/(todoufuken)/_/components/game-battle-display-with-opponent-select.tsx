import { useState } from 'react';

import { PrefectureResponse } from 'schema/dist/prefecture';
import { GameResponse } from 'schema/dist/todoufuken/game';

import NotchedPaperBurlywood from '@/assets/notched-paper-burlywood.png';
import SwordLeft from '@/assets/sword-left.svg?react';
import SwordRight from '@/assets/sword-right.svg?react';
import { ImageBgContainer } from '@/components/containers/image-bg-container';
import { PrefectureSVG } from '@/components/maps/prefecture-svg';
import { useSound } from '@/lib/use-sound/use-sound';

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
  const { playDisabledClick, playSwordSlash } = useSound();

  const [isSelectedOpponent, setIsSelectedOpponent] = useState(false);

  const [isPlaySwordAnimation, setIsPlaySwordAnimation] = useState(false);

  const handleClickDisabled = () => {
    playDisabledClick();
  };

  const handleClickSelectOpponentWithBattleAnimation = (opponentId: number) => {
    setIsSelectedOpponent(true);

    setTimeout(() => {
      // 刀を打ち合うアニメーションを再生
      setIsPlaySwordAnimation(true);
    }, 200);

    setTimeout(() => {
      // 音を再生
      playSwordSlash();
    }, 500);

    setTimeout(() => {
      handleClickSelectOpponent(opponentId);
    }, 200);
  };

  return (
    <>
      <div className="grid grid-cols-5 lg:px-20">
        {/* 自分側の都道府県を表示するエリア */}
        <div className="col-span-2 flex flex-col">
          <ImageBgContainer
            imagePath={NotchedPaperBurlywood}
            className="mb-2 py-2 text-2xl lg:py-3 lg:text-3xl"
          >
            {prefecture.name}
          </ImageBgContainer>
          <div className="h-48 sm:h-80">
            <PrefectureSVG prefectureNameEn={prefecture.en} className="h-full" />
          </div>
        </div>
        <div className="col-span-1 flex items-center justify-center px-4">
          {!isSelectedOpponent ? (
            <div className="text-3xl">VS</div>
          ) : (
            // ここにアニメーションを入れる
            <div className="relative flex h-full w-full">
              {/* sword left */}
              <div
                className={`absolute w-1/2 ${
                  isPlaySwordAnimation ? 'left-[15%]' : 'left-0'
                } top-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out`}
              >
                <div className="relative h-full w-full">
                  <SwordLeft className="h-auto w-full" />
                </div>
              </div>
              {/* sword right */}
              <div
                className={`absolute top-1/2 w-1/2 ${
                  isPlaySwordAnimation ? 'right-[15%]' : 'right-0'
                } -translate-y-1/2 transition-all duration-500 ease-in-out`}
              >
                <div className="relative h-full w-full">
                  <SwordRight className="h-auto w-full" />
                </div>
              </div>
            </div>
          )}
        </div>
        {/* 相手県を選択するエリア */}
        <div className="col-span-2 flex flex-col">
          <ImageBgContainer
            imagePath={NotchedPaperBurlywood}
            className="mb-2 py-2 text-2xl lg:py-3 lg:text-3xl"
          >
            どの都道府県に挑む？
          </ImageBgContainer>
          <div
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className="custom-scroll-bar h-48 overflow-scroll overflow-x-hidden border-4 border-gray-400 bg-white/40 sm:h-80"
            onClick={disabled ? handleClickDisabled : undefined}
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
                  onClick={() => handleClickSelectOpponentWithBattleAnimation(neighbor.id)}
                  role="button"
                >
                  <div>{neighbor.name}</div>
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
