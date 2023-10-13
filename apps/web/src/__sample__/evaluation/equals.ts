export const sum = (a: number, b: number): number => {
  return a + b;
};

export interface Item {
  name: string;
  count: number;
}

export const sumItemsCount = (a: Item, b: Item): Item => {
  return {
    name: `${a.name},${b.name}`,
    count: a.count + b.count,
  };
};
