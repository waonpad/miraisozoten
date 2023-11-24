import { Button } from 'ui/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'ui/components/ui/tooltip';

import CircleInfoIcon from '@/assets/icons/circle-info.svg?react';

/**
 * @description
 * 難易度の説明を表示するTooltip
 */
export const GameDifficultyInfo = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button asChild size={'icon'} variant={'icon'}>
            <CircleInfoIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div>【難易度】</div>
          <div>バトル難易度を設定します。</div>
          <div>Easy：3選択肢から対戦要素を選びます。</div>
          <div>Normal：4選択肢から対戦要素を選びます。</div>
          <div>Hard：4選択肢に加え、データの数値を見ることができません。</div>
          <div>Very Hard：6選択肢に加え、データの数値を見ることができません。</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
