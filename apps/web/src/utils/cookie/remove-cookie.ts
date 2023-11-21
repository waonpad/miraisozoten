export const removeCookie = (name: string): void => {
  document.cookie = `${name}=;max-age=0`;
};
