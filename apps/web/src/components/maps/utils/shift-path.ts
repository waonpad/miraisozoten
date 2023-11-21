/**
 * @description
 * 相対パスで記述されているpathを移動させる
 * @example
 * shiftPath({ d: 'm 0,0 100,100', dx: 10, dy: 10 }) // => 'm 10,10 100,100'
 */
export const shiftPath = ({ d, dx, dy }: { d: string; dx: number; dy: number }): string => {
  const commands = d.split(' ');

  const [x, y] = commands[1].split(',');

  return [commands[0], `${Number(x) + dx},${Number(y) + dy}`, ...commands.slice(2)].join(' ');
};
