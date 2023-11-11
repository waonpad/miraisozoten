import { useAuth } from '@/auth/use-auth';

// TODO: アイコンボタンにして、propsも受け取れるようにする
export const AuthIconButton = () => {
  const { user, login, logout } = useAuth();

  return (
    <>
      {user ? (
        <button onClick={() => logout()}>ログアウト</button>
      ) : (
        <button onClick={() => login('google')}>ログイン</button>
      )}
    </>
  );
};
