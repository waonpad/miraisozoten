export const setCookie = (name: string, value: string, days?: number): void => {
  const date = new Date();
  date.setTime(date.getTime() + (days ?? 365) * 24 * 60 * 60 * 1000);
  const expires = '; expires=' + date.toUTCString();
  document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
};
