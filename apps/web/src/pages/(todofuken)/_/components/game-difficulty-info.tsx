import { Button } from 'ui/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'ui/components/ui/tooltip';

export const GameDifficultyInfo = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">難易度の説明</Button>
        </TooltipTrigger>
        <TooltipContent>
          <div>難易度についての説明</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
