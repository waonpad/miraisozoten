export const GameStates = ['lobby', 'battle', 'result'] as const;

export type GameState = (typeof GameStates)[number];
