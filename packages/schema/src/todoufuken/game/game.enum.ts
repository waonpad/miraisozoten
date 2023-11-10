export const GameState = ['STARTING', 'PREPARING', 'ACTING', 'FINISHED'] as const;
export const GameDifficulty = ['EASY', 'NORMAL', 'HARD', 'VERY_HARD'] as const;
export const GameMode = ['NATIONWIDE', 'REGIONAL'] as const;
export const GameResult = ['WIN', 'DRAW', 'LOSE'] as const;
export const HighLow = ['HIGH', 'LOW'] as const;

export type GameState = (typeof GameState)[number];
export type GameDifficulty = (typeof GameDifficulty)[number];
export type GameMode = (typeof GameMode)[number];
export type GameResult = (typeof GameResult)[number];
export type HighLow = (typeof HighLow)[number];
