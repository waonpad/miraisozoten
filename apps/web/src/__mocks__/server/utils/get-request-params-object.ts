export const getRequestPramsObject = (URLSearchParams: URLSearchParams) => {
  const params = Object.fromEntries(URLSearchParams.entries());
  return params;
};
