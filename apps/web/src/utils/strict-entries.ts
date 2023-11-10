// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const strictEntries = <T extends Record<string, any>>(
  object: T
): [keyof T, T[keyof T]][] => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return Object.entries(object);
};
