import { Button } from 'ui/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'ui/components/ui/tooltip';

/**
 * @description
 * モードの説明を表示するTooltip
 */
export const GameModeInfo = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {/* TODO: アイコンボタンに変更する */}
          <Button variant="outline">モードの説明</Button>
        </TooltipTrigger>
        <TooltipContent>
          <div>モードについての説明</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
