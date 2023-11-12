import { Button } from 'ui/components/ui/button';

import { usePrefectures } from '@/pages/(prefectures)/_/api/get-prefectures';
import { assert } from '@/utils/asset';

import { useGame } from '../../hooks/use-game';
import { useGameTurnAction } from '../../hooks/use-game-turn-action';
import { getAllFactors } from '../../utils/gat-all-factors';
import { GameBattleDisplay } from '../game-battle-display';
import { GameTurnFactorSelect } from '../game-turn-factor-select';
import { GameTurnQuestion } from '../game-turn-question';

export const GameTurnAction = () => {
  const { game } = useGame();
  assert(game);

  const { turnAction, setTurnAction, submitTurnAction } = useGameTurnAction();

  // 都道府県のデータを取得
  const prefecturesQuery = usePrefectures();
  const prefectures = prefecturesQuery.data!;
  // 選択肢一覧を、表示に必要な情報に変換
  const factors = getAllFactors(prefectures, game);

  // 対戦相手となる都道府県を選択したら、ターンの行動を記録するステートに反映
  const handleClickSelectOpponent = (opponentId: number) => {
    setTurnAction((prev) => ({ ...prev, opponentId }));
  };

  // TODO: 修正
  // 選択肢を選択したら、ターンの行動が揃うので、バックエンドに送信
  // 取り敢えず、対戦相手県を先に選択して、その後に選択肢を選択るパターンを想定
  // 逆の場合は、handleClickSelectOpponentにsubmitTurnActionを入れる
  const handleClcikSelectFactor = (factor: ReturnType<typeof getAllFactors>[number]) => {
    submitTurnAction({
      ...turnAction,
      factorPrefectureId: factor.prefecture.id,
      factorName: factor.name,
    });
  };

  return (
    <>
      {/* 相手県を選択するエリア */}
      {game.neighbors.map((neighbor) => (
        <Button key={neighbor.id} onClick={() => handleClickSelectOpponent(neighbor.id)}>
          {neighbor.name}
        </Button>
      ))}
      {/* 対戦相手が選択されていない可能性がある */}
      {/* とりあえず選択されるまで非表示にしておく */}
      {!!turnAction.opponentId && (
        <GameBattleDisplay
          prefecture={findById(prefectures, turnAction.factorPrefectureId ?? game.prefectureId)!}
          opponent={findById(prefectures, turnAction.opponentId)!}
        />
      )}
      {/* 対戦相手県が選択されていない可能性がある */}
      {/* とりあえず選択されるまで非表示にしておく */}
      {!!turnAction.opponentId && (
        <GameTurnQuestion
          highLow={turnAction.highLow!}
          opponentPrefecture={findById(prefectures, turnAction.opponentId)!}
        />
      )}
      {/* 要素を選択するエリア */}
      <GameTurnFactorSelect factors={factors} handleClickSelectFactor={handleClcikSelectFactor} />
    </>
  );
};

/**
 * コードが見にくかったので分けた
 */
const findById = <T extends { id: number }>(array: T[], id: number) =>
  array.find((item) => item.id === id);
