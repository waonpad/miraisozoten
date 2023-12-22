import { useEffect } from 'react';

import NotchedPaperBurlywood from '@/assets/notched-paper-burlywood.png';
import NotchedPaperOrange from '@/assets/notched-paper-orange.png';
import { ImageBgContainer } from '@/components/containers/image-bg-container';
import { ImageBgButton } from '@/components/elements/image-bg-button';
import { PrefectureSVG } from '@/components/maps/prefecture-svg';
import { useFadeTransition } from '@/components/transitions/fade-transition/use-fade-transition';
import { useSound } from '@/lib/use-sound/use-sound';
import { usePrefectures } from '@/pages/(prefectures)/_/api/get-prefectures';
import { assert } from '@/utils/asset';

import { LabeledTurnResult } from '../../config/game';
import { useGame } from '../../hooks/use-game';
import { getTurnAllyFactor } from '../../utils/get-turn-ally-factor';
import { getTurnOpponentFactor } from '../../utils/get-turn-opponent-factor';

/**
 * @description
 * ターンの結果を表示する画面 \
 * 勝敗結果と、自分と相手のデータを表示する
 */
export const GameTurnResult = () => {
  const { game, changeScreenNextTurn, changeScreenResult } = useGame();
  assert(game);

  const { playGameTurnWin, playGameTurnLose, playGameTurnDraw, playPageMove } = useSound();

  const fadeTransition = useFadeTransition();

  // 都道府県のデータを取得
  const prefecturesQuery = usePrefectures();
  const prefectures = prefecturesQuery.data!;

  /**
   * @description
   * 現在のターンの情報 \
   * ターンの行動を送信した後にゲームの状態が更新されるため、最後のログは現在のターンの情報
   */
  const currentTurn = game.logs[game.logs.length - 1];

  /**
   * @description
   * 現在のターンに自分が使用した都道府県
   */
  const currentTurnAllyPrefecture = prefectures.find(
    (prefecture) => prefecture.id === currentTurn.factorPrefectureId
  )!;

  const handleClickNextTurn = () => {
    playPageMove();

    fadeTransition.closeFade();

    setTimeout(() => {
      changeScreenNextTurn();
    }, fadeTransition.duration);
  };

  const handleClickChangeScreenResult = () => {
    playPageMove();

    fadeTransition.closeFade();

    setTimeout(() => {
      changeScreenResult();
    }, fadeTransition.duration);
  };

  /**
   * @description
   * 画面遷移してきたときに、ターンの結果に応じた効果音を再生する
   */
  useEffect(() => {
    if (!fadeTransition.isOpen) {
      fadeTransition.openFade();
    }

    (() => {
      ({
        WIN: playGameTurnWin,
        LOSE: playGameTurnLose,
        DRAW: playGameTurnDraw,
      })[currentTurn.result]();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * @description
   * 現在のターンに自分が使用した統計データ
   */
  const allyFactor = getTurnAllyFactor(prefectures, game, currentTurn.factorName);

  /**
   * @description
   * 現在のターンに使用した統計データの相手県側のデータ
   */
  const opponentFactor = getTurnOpponentFactor({
    factorName: currentTurn.factorName,
    prefectures,
    prefectureId: currentTurn.opponentId, // 相手の都道府県ID
  });

  return (
    <>
      {/* TODO: ターンの結果を2箇所に書いているので、後で整理する */}
      <div className="flex grow flex-col gap-4 p-2 lg:p-3 lg:px-10">
        <div className="flex lg:px-20">
          <div className="flex flex-1 flex-col">
            <ImageBgContainer
              imagePath={NotchedPaperBurlywood}
              className="mb-2 py-2 text-2xl lg:py-3 lg:text-3xl"
            >
              {currentTurnAllyPrefecture.name}
            </ImageBgContainer>
            <div className="h-48 sm:h-80">
              <PrefectureSVG prefectureNameEn={currentTurnAllyPrefecture.en} />
            </div>
          </div>

          {/* 選択画面と幅と同じにするためにとりあえずそのまま要素を持ってきて非表示にした */}
          <div className="invisible flex items-center justify-center px-4 text-3xl lg:hidden lg:px-20">
            VS
          </div>

          {/* ターンの結果 */}
          <div className="hidden flex-1 flex-col items-center justify-center px-4 text-3xl lg:flex lg:px-20">
            {game.state === 'FINISHED' ? (
              <>
                <div>おめでとう！</div>
                <ImageBgButton
                  imagePath={NotchedPaperOrange}
                  onClick={handleClickChangeScreenResult}
                  className="mt-4 w-full py-2 text-2xl lg:py-3 lg:text-3xl"
                >
                  結果を見る！
                </ImageBgButton>
              </>
            ) : (
              <>
                <div>{LabeledTurnResult[currentTurn.result]}</div>
                <ImageBgButton
                  imagePath={NotchedPaperOrange}
                  onClick={handleClickNextTurn}
                  className="mt-4 w-full py-2 text-2xl lg:py-3 lg:text-3xl"
                >
                  次へ
                </ImageBgButton>
              </>
            )}
          </div>

          <div className="flex flex-1 flex-col">
            <ImageBgContainer
              imagePath={NotchedPaperBurlywood}
              className="mb-2 py-2 text-2xl lg:py-3 lg:text-3xl"
            >
              {currentTurn.opponent.name}
            </ImageBgContainer>
            <div className="h-48 sm:h-80">
              <PrefectureSVG prefectureNameEn={currentTurn.opponent.en} />
            </div>
          </div>
        </div>

        {/* ターンの結果 */}
        <div className="mx-auto flex w-1/2 flex-col items-center justify-center text-3xl lg:hidden">
          {game.state === 'FINISHED' ? (
            <>
              <div>おめでとう！</div>
              <ImageBgButton
                imagePath={NotchedPaperOrange}
                onClick={handleClickChangeScreenResult}
                className="mt-4 w-full py-2 text-2xl lg:py-3 lg:text-3xl"
              >
                結果を見る！
              </ImageBgButton>
            </>
          ) : (
            <>
              <div>{LabeledTurnResult[currentTurn.result]}</div>
              <ImageBgButton
                imagePath={NotchedPaperOrange}
                onClick={handleClickNextTurn}
                className="mt-4 w-full py-2 text-2xl lg:py-3 lg:text-3xl"
              >
                次へ
              </ImageBgButton>
            </>
          )}
        </div>

        <div className="grid grow grid-cols-1 gap-4 lg:grid-cols-3 lg:py-8">
          {/* 自分が利用したデータと相手のデータを表示する */}
          <div className="flex flex-col">
            <div className="flex justify-center text-2xl lg:hidden">
              {allyFactor.prefecture.name}
            </div>
            <ImageBgContainer
              imagePath={NotchedPaperBurlywood}
              className="relative grow p-3 lg:p-4"
            >
              <div className="text-xl lg:text-2xl">
                <span>{allyFactor.label}</span>
                <br className="hidden lg:inline" />
                <span className="inline lg:hidden">{'　'}</span>
                <span>
                  {allyFactor.totalValue}
                  {allyFactor.unit}
                </span>
              </div>
              <div>
                {/* ここに選択した都道府県以外の吸収したデータの合計を表示 */}
                {!game.hideData && allyFactor.absorbedFactors.length > 0 && (
                  <div className="absolute bottom-2 right-7 text-sm lg:bottom-4 lg:right-7 lg:text-base">{`+ ${
                    allyFactor.totalValue - allyFactor.value!
                  } ${allyFactor.unit}`}</div>
                )}
              </div>
            </ImageBgContainer>
          </div>

          {/* ダミー */}
          <div className="hidden lg:block"></div>

          <div className="flex flex-col">
            <div className="flex justify-center text-2xl lg:hidden">
              {opponentFactor.prefecture.name}
            </div>
            <ImageBgContainer imagePath={NotchedPaperBurlywood} className="grow p-3 lg:p-4">
              <div className="text-xl lg:text-2xl">
                <span>{opponentFactor.label}</span>
                <br className="hidden lg:inline" />
                <span className="inline lg:hidden">{'　'}</span>
                <span>
                  {opponentFactor.value}
                  {opponentFactor.unit}
                </span>
              </div>
            </ImageBgContainer>
          </div>
        </div>
      </div>
    </>
  );
};
