import { useEffect, useState } from 'react';

import { CredentialResponse } from '@react-oauth/google';
import { User } from 'database';

import { COOKIE_NAMES } from '@/constants/cookie-names';
import { axios } from '@/lib/axios';
import { useCookies } from '@/lib/react-cookie';
import { useLogin } from '@/pages/(auth)/_/api/login';
import { createCtx } from '@/utils/create-ctx';

const [createdUseAuth, SetAuthProvider] = createCtx<ReturnType<typeof useAuthCtx>>();

export { SetAuthProvider };

export const useAuth = createdUseAuth;

export const useAuthCtx = () => {
  const { cookies, setCookie, removeCookie } = useCookies();

  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState<User | null>(null);

  const loginMutation = useLogin();

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    // トークンを取得できなかった場合
    if (!credentialResponse.credential) {
      console.error('credentialResponse.credential is null');

      return;
    }

    const resUser = await loginMutation.mutateAsync({
      authToken: credentialResponse.credential,
    });

    // トークンをcookieに保存
    setCookie(COOKIE_NAMES.AUTH_TOKEN, credentialResponse.credential, {
      sameSite: 'none',
      secure: true,
    });

    // ユーザー情報をstateに保存
    setUser(resUser);
  };

  const logout = () => {
    // ユーザー情報をstateから削除
    setUser(null);

    // cookieからトークンを削除
    removeCookie(COOKIE_NAMES.AUTH_TOKEN);
  };

  useEffect(() => {
    (async () => {
      const authToken = cookies[COOKIE_NAMES.AUTH_TOKEN];

      // cookieにトークンが存在しない場合
      if (!authToken) {
        setIsLoading(false);

        return;
      }

      const resUser = await axios.get<null, User>(`/auth/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log('Already Logged in', resUser);

      setUser(resUser);
    })();

    setIsLoading(false);
    // 何かしらのCookieが変更された場合に再度実行される
  }, [cookies]);

  return {
    isLoading,
    user,
    handleGoogleLogin,
    logout,
  };
};
