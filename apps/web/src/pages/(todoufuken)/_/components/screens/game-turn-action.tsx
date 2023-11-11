import { useState } from 'react';

import { HighLow } from 'schema/dist/todoufuken/game';
import { CreateGameLogInput } from 'schema/dist/todoufuken/game/log';
import { Button } from 'ui/components/ui/button';

import { usePrefectures } from '@/pages/(prefectures)/_/api/get-prefectures';
import { randomElement } from '@/utils/random';

import { useGame } from '../../hooks/use-game';
import { getAllFactors } from '../../utils/gat-all-factors';
import { GameBattleDisplay } from '../game-battle-display';
import { GameTurnFactorSelect } from '../game-turn-factor-select';
import { GameTurnQuestion } from '../game-turn-question';

export const GameTurnAction = () => {
  const { game, submitTurnAct } = useGame();

  if (!game) throw new Error('game is not found');

  // 初期値に勝敗条件を設定して、ターンの行動を記録するステートを作成
  const [turnAct, setTurnAct] = useState<Partial<CreateGameLogInput>>({
    highLow: randomElement([...HighLow]),
  });

  // 都道府県のデータを取得
  const prefecturesQuery = usePrefectures();

  const prefectures = prefecturesQuery.data;

  if (!prefectures) {
    return <div>loading...</div>;
  }

  // 対戦相手となる都道府県を選択したら、ターンの行動を記録するステートに反映
  const handleClickSelectOpponent = (opponentId: number) => {
    setTurnAct((prev) => ({
      ...prev,
      opponentId,
    }));
  };

  // 選択肢一覧を、表示に必要な情報に変換
  const factors = getAllFactors(prefectures, game);

  // 選択肢を選択したら、ターンの行動が揃うので、バックエンドに送信
  const handleClcikSelectFactor = (factor: ReturnType<typeof getAllFactors>[number]) => {
    submitTurnAct({
      ...turnAct,
      factorPrefectureId: factor.prefecture.id,
      factorName: factor.name,
    });
  };

  return (
    <>
      {/* 対戦に使う自分側のデータは吸収した県のものになる可能性があるため
      最初は一番最初に選んだ県を表示しておき、選択肢が他の県のものだった場合
      その県のsvgを表示するようにする？ */}
      {/* 相手の県も、選ばれるまでは空白になってしまう
      どうする？ */}
      {game.neighbors.map((neighbor) => (
        <Button key={neighbor.id} onClick={() => handleClickSelectOpponent(neighbor.id)}>
          {neighbor.name}
        </Button>
      ))}
      {/* 対戦相手が選択されていない可能性がある */}
      {/* とりあえず選択されるまで非表示にしておく */}
      {!!turnAct.opponentId && (
        <GameBattleDisplay
          prefecture={findById(prefectures, turnAct.factorPrefectureId ?? game.prefectureId)!}
          opponent={findById(prefectures, turnAct.opponentId)!}
        />
      )}
      {/* 対戦相手県が選択されていない可能性がある */}
      {/* とりあえず選択されるまで非表示にしておく */}
      {!!turnAct.opponentId && (
        <GameTurnQuestion
          highLow={turnAct.highLow!}
          opponentPrefecture={findById(prefectures, turnAct.opponentId)!}
        />
      )}
      <GameTurnFactorSelect factors={factors} handleClcikSelectFactor={handleClcikSelectFactor} />
    </>
  );
};

/**
 * コードが見にくかったので分けた
 */
const findById = <T extends { id: number }>(array: T[], id: number) =>
  array.find((item) => item.id === id);
