import { useCookies as useReactCookie } from 'react-cookie';

export const useCookies = () => {
  const [cookies, setCookie, removeCookie] = useReactCookie();

  return {
    cookies,
    setCookie,
    removeCookie,
  };
};
