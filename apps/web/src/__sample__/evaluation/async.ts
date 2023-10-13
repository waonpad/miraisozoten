export const promiseFunc = (shouldResolve: boolean) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve('Hello, World!');
      } else {
        reject('Error!');
      }
    }, 1000);
  });
};
