import { useState } from 'react';

import { Button } from 'ui/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'ui/components/ui/tooltip';

import CircleInfoIcon from '@/assets/icons/circle-info.svg?react';

/**
 * @description
 * モードの説明を表示するTooltip
 */
export const GameModeInfo = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickTrigger = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <TooltipProvider>
      <Tooltip open={isOpen} onOpenChange={setIsOpen}>
        <TooltipTrigger>
          <Button
            asChild
            size={'icon'}
            variant={'icon'}
            className="h-7 w-7"
            onClick={handleClickTrigger}
          >
            <CircleInfoIcon className="fill-current text-gray-600" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="max-w-[100vw] text-xl">
            <div>【モード】</div>
            <div>バトル時のモードを設定します。</div>
            <div>
              地方制覇モード：選択した都道府県の所属する地方の都道府県と闘います。手軽に遊びたい方におすすめです。
            </div>
            <div>
              全国制覇モード：選択した都道府県で全国の都道府県と闘います。対戦数が多いため、集中して遊びたい方におすすめです。
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
