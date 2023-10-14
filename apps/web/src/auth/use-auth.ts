import { useEffect, useState } from 'react';

import { CredentialResponse } from '@react-oauth/google';
import { UserResponse } from 'schema/dist/user';

import { COOKIE_NAMES } from '@/constants/cookie-names';
import { useCookies } from '@/lib/react-cookie';
import { useAuthUser } from '@/pages/(auth)/_/api/get-auth-user';
import { useLogin } from '@/pages/(auth)/_/api/login';
import { createCtx } from '@/utils/create-ctx';

const [createdUseAuth, SetAuthProvider] = createCtx<ReturnType<typeof useAuthCtx>>();

export { SetAuthProvider };

export const useAuth = createdUseAuth;

export const useAuthCtx = () => {
  const { cookies, setCookie, removeCookie } = useCookies();

  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState<UserResponse>();

  const loginMutation = useLogin();

  const authUserQuery = useAuthUser();

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
    setUser(undefined);

    // cookieからトークンを削除
    removeCookie(COOKIE_NAMES.AUTH_TOKEN);
  };

  useEffect(() => {
    // TODO: 冗長なので, 後で直す
    (async () => {
      const authToken = cookies[COOKIE_NAMES.AUTH_TOKEN];

      // cookieにトークンが存在しない場合
      if (!authToken) {
        setIsLoading(false);

        return;
      }

      const resUser = authUserQuery.data;

      console.log('Already Logged in', resUser);

      setUser(resUser);
    })();

    setIsLoading(false);
    // 何かしらのCookieが変更された場合に再度実行される
  }, [authUserQuery.data, cookies]);

  return {
    isLoading,
    user,
    handleGoogleLogin,
    logout,
  };
};
