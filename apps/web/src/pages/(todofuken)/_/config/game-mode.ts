export const GameModes = ['area', 'nationwide'] as const;

export type GameMode = (typeof GameModes)[number];
