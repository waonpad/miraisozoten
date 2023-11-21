import { useAuth } from '@/auth/use-auth';

// TODO: アイコンボタンにして、propsも受け取れるようにする
export const AuthIconButton = () => {
  const { user, login, logout } = useAuth();

  const isLoggedIn = !!user;

  const isAnonymous = user?.email?.endsWith('@example.com');

  return (
    <>
      {isLoggedIn && !isAnonymous && (
        // ログインしていて、かつ匿名ユーザーでなければログアウトできる
        <button onClick={() => logout()}>ログアウト</button>
      )}
      {((isLoggedIn && isAnonymous) || !isLoggedIn) && (
        // ログインされていていも、匿名ユーザーなら実際のアカウントでログインできる
        // ログインされていなければログインできる(自動で匿名ログインされるため、起こらないはず)
        <button onClick={() => login('google')}>ログイン</button>
      )}
    </>
  );
};
