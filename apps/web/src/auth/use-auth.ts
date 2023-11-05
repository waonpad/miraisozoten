import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useErrorBoundary } from 'react-error-boundary';
import { UserResponse } from 'schema/dist/user';

import { COOKIE_NAMES } from '@/constants/cookie-names';
import {
  firebaseAuth,
  firebaseAuthProviders,
  signOut as firebaseLogOut,
  onAuthStateChanged,
  signInAnonymously,
  linkWithRedirect,
  getRedirectResult,
  FirebaseError,
  OAuthProvider,
  signInWithCredential,
} from '@/lib/firebase';
import { useLogin } from '@/pages/(auth)/_/api/login';
import { Path, useNavigate } from '@/router';
import { removeCookie } from '@/utils/cookie/remove-cookie';
import { createCtx } from '@/utils/create-ctx';

import { RETURN_TO } from './auth-guard';

const [createdUseAuth, SetAuthProvider] = createCtx<ReturnType<typeof useAuthCtx>>();

export { SetAuthProvider };

export const useAuth = createdUseAuth;

export const useAuthCtx = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showBoundary } = useErrorBoundary();

  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState<UserResponse>();

  const loginMutation = useLogin();

  const login = async (provider: keyof typeof firebaseAuthProviders) => {
    // アカウントを選ばせる方式だと、リンク失敗→サインインをさせたくても毎回アカウントを選ばせる必要がある ← どうする？
    firebaseAuthProviders[provider].setCustomParameters({ prompt: 'select_account' });

    // ログインしているユーザーがいない場合自動で匿名ログインされるので、currentUser!としている
    // 既にプロバイダをリンク済みの場合auth/provider-already-linkedエラーが発生する ← どうする？
    await linkWithRedirect(firebaseAuth.currentUser!, firebaseAuthProviders[provider]);
  };

  const logout = () => {
    // ユーザー情報をstateから削除
    setUser(undefined);

    // ブラウザからfirebaseの認証情報を削除
    firebaseLogOut(firebaseAuth);
  };

  const getRedirectResultFn = async () => {
    try {
      const res = await getRedirectResult(firebaseAuth);

      // firefox, safariではストレージに触る権限がないので、認証を行えない
      // TODO: Issue #122
      console.log('getRedirectResult', res);
    } catch (error) {
      // ログインしようとしたアカウントが既に存在する場合は、そのアカウントにログインする
      if ((error as FirebaseError).code === 'auth/credential-already-in-use') {
        console.log('既に存在するアカウントにログインする');

        const credential = OAuthProvider.credentialFromError(error as FirebaseError);

        if (!credential) {
          showBoundary(new Error('No credential'));
          return;
        }

        await signInWithCredential(firebaseAuth, credential);
      } else {
        showBoundary(error);
      }
    }
  };

  useEffect(() => {
    getRedirectResultFn();

    return onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
      if (!firebaseUser) {
        console.log('ログインしていない');

        // ゲームにアクセスする権限はゲームの作成ユーザーにしかないため、ログアウトされたらcookieを削除する
        removeCookie(COOKIE_NAMES.CURRENT_TODOFUKEN_GAME_ID);

        // 匿名ログインはfirebaseの設定画面から有効にしないとできない
        await signInAnonymously(firebaseAuth);
        // signInAnonymouslyが実行されると、onAuthStateChangedが再発火する
      } else {
        console.log('ログインしている');

        const idToken = await firebaseUser.getIdToken();

        const resUser = await loginMutation.mutateAsync({
          authToken: idToken,
        });

        console.log('ユーザー情報', resUser);

        // ユーザー情報をstateに保存
        setUser(resUser);

        // // ログイン後に遷移するページがある場合は遷移
        // getRedirectResultFnで行ったほうがいい？
        const returnTo = new URLSearchParams(location.search).get(RETURN_TO);
        // 遷移先の指定がなければそのまま (ホントか？)
        returnTo && navigate(decodeURIComponent(returnTo) as unknown as Path);

        setIsLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    user,
    login,
    logout,
  };
};
