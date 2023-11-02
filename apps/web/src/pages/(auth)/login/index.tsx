import { useAuth } from '@/auth/use-auth';

export default function Login() {
  const { user, login } = useAuth();

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex w-full max-w-screen-lg flex-col items-center justify-center lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <button className="bg-gray-100 p-5" onClick={() => login('google')}>
              Googleログイン
            </button>
            <div className="w-full break-all">{JSON.stringify(user)}</div>
          </div>
        </div>
      </div>
    </>
  );
}
