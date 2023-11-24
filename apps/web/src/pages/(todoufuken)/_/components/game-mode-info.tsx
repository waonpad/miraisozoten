import { Button } from 'ui/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'ui/components/ui/tooltip';

import CircleInfoIcon from '@/assets/icons/circle-info.svg?react';

/**
 * @description
 * モードの説明を表示するTooltip
 */
export const GameModeInfo = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button asChild size={'icon'} variant={'icon'}>
            <CircleInfoIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div>【モード】</div>
          <div>バトル時のモードを設定します。</div>
          <div>
            地方制覇モード：選択した都道府県の所属する地方の都道府県と闘います。手軽に遊びたい方におすすめです。
          </div>
          <div>
            全国制覇モード：選択した都道府県で全国の都道府県と闘います。対戦数が多いため、集中して遊びたい方におすすめです。
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
