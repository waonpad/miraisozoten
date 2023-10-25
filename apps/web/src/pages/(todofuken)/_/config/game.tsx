import { PrefectureWithNeighbors } from 'prefecture/dist';

import { GameBattle } from '../components/screens/game-battle';
import { GameLobby } from '../components/screens/game-lobby';
import { GameResult } from '../components/screens/game-result';
import { GameSelectFactor } from '../components/screens/game-select-factor';
import { GameSelectHighLow } from '../components/screens/game-select-high-low';
import { GameSelectOpportunity } from '../components/screens/game-select-opportunity';

export type Game = {
  prefecture: PrefectureWithNeighbors | null;
  conqueredPrefectures: PrefectureWithNeighbors[];
  state: GameState;
  difficulty: GameDifficulty | null;
  mode: GameMode | null;
  isSettingCompleted: boolean;
  turn: Turn;
  logs: GameLog[];
  factors: Factor[];
};

export const GameDifficulties = ['easy', 'normal', 'hiddenNormal', 'hard'] as const;
export type GameDifficulty = (typeof GameDifficulties)[number];

export const GameModes = ['area', 'nationwide'] as const;
export type GameMode = (typeof GameModes)[number];

export const HighLow = ['high', 'low'] as const;
export type HighLow = (typeof HighLow)[number];

export const GameBattleResults = ['win', 'lose', 'draw'] as const;
export type GameBattleResult = (typeof GameBattleResults)[number];

// DBに保存するデータ？
export type PrefectureStat = {
  prefectureId: PrefectureWithNeighbors['id'];
  name: string;
  value: number;
  unit: string;
};

export type PrefectureStats = {
  [key: string]: PrefectureStat;
};

export type Factor = PrefectureStat;

export const GameStates = [
  'lobby',
  'highLow',
  'selectFactor',
  'selectOppo',
  'battle',
  'result',
] as const;
export type GameState = (typeof GameStates)[number];

export const GameScreens = {
  lobby: <GameLobby />,
  highLow: <GameSelectHighLow />,
  selectFactor: <GameSelectFactor />,
  selectOppo: <GameSelectOpportunity />,
  battle: <GameBattle />,
  result: <GameResult />,
} satisfies { [key in GameState]: JSX.Element };

export type GameLog = {
  highLow: HighLow;
  factor: Factor;
  opportunity: PrefectureWithNeighbors;
  result: GameBattleResult;
};

export type Turn = Partial<GameLog>;
