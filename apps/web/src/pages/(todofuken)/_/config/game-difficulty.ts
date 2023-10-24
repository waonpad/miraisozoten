export const GameDifficulties = ['easy', 'normal', 'hard'] as const;

export type GameDifficulty = (typeof GameDifficulties)[number];
