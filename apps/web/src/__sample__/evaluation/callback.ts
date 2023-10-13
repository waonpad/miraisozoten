// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const timeoutCallback = (callback: any) => {
  setTimeout(callback, 1000, 'Hello, World!');
};
