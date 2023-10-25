import { Prefecture } from 'prefecture/dist';
import { Button } from 'ui/components/ui/button';

import { usePrefectureStats } from '../../api/get-prefecture-stats';
import { PrefectureStat } from '../../config/game';
import { useGame } from '../../hooks/use-game';

export const GameSelectFactor = () => {
  const game = useGame();

  // TODO: 倒した相手の要素も表示する (どう吸収するの？)
  // TODO: 既に取得している要素もある
  const prefectureStatsQuery = usePrefectureStats({
    id: game.data.prefecture?.id as Prefecture['id'],
    hideData: game.data.hideData,
  });

  // TODO: easyなら3つ、normalなら4つ、hardなら6つ、ランダムで抽出する
  const factors = Object.values(prefectureStatsQuery.data ?? {});

  const handleClickChangeState = (factor: PrefectureStat) => {
    game.turn.setFactor(factor);

    game.changeStateNext();
  };

  return (
    <div>
      {factors.map((factor, index) => (
        <Button key={index} onClick={() => handleClickChangeState(factor)}>
          {factor.name}
          {!game.data.hideData && (
            <div>
              {factor.value}
              {factor.unit}
            </div>
          )}
        </Button>
      ))}
    </div>
  );
};
