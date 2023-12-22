import { GameDifficulty } from 'schema/dist/todoufuken/game';
import {
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from 'ui/components/ui/select';

import { LabeledGameDifficulty } from '@/pages/(todoufuken)/_/config/game';

import { Regions } from '../constants/regions';

import { InfiniteGameRankingListProps } from './infinite-game-ranking-list';

export type GameRankingFilterProps = {
  filterParams: InfiniteGameRankingListProps['filterParams'];
  handleClickGameDifficulty: (difficulty: GameDifficulty) => void;
  handleClickGameMode: (mode: 'NATIONWIDE' | `REGIONAL-${number}`) => void;
};

export const GameRankingFilter = ({
  filterParams,
  handleClickGameDifficulty,
  handleClickGameMode,
}: GameRankingFilterProps) => {
  return (
    <>
      <div>
        <div>
          {/* モード(地方ごとにも分ける) */}
          <Select defaultValue={filterParams.mode} onValueChange={handleClickGameMode}>
            <SelectTrigger>
              <SelectValue
                placeholder={
                  filterParams.mode === 'NATIONWIDE'
                    ? '全国制覇'
                    : Regions[filterParams.mode.split('-')[1] as unknown as keyof typeof Regions]
                        .name
                }
              >
                {filterParams.mode === 'NATIONWIDE'
                  ? '全国制覇'
                  : Regions[filterParams.mode.split('-')[1] as unknown as keyof typeof Regions]
                      .name}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NATIONWIDE">全国制覇</SelectItem>
              {Object.values(Regions).map((region, index) => (
                <SelectItem key={index} value={`REGIONAL-${region.id.toString()}`}>
                  {region.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          {/* 難易度 */}
          <Select defaultValue={filterParams.difficulty} onValueChange={handleClickGameDifficulty}>
            <SelectTrigger>
              <SelectValue placeholder={LabeledGameDifficulty[filterParams.difficulty!]}>
                {LabeledGameDifficulty[filterParams.difficulty!]}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Object.entries(LabeledGameDifficulty).map(([difficulty, label]) => (
                <SelectItem key={difficulty} value={difficulty}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};
