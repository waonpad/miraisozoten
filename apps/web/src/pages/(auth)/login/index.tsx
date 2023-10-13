import { useNavigate, useLocation, Path } from 'react-router-dom';

import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

import { useAuth } from '@/auth/use-auth';

export default function Login() {
  const { handleGoogleLogin } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();
  const returnTo = new URLSearchParams(location.search).get('returnTo');

  const postGoogleLogin = async () => {
    navigate((returnTo && (decodeURIComponent(returnTo) as unknown as Path)) || '/');
  };

  const onGoogleLoginSuccess = (credentialResponse: CredentialResponse) => {
    handleGoogleLogin(credentialResponse);
    postGoogleLogin();
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex w-full max-w-screen-lg flex-col items-center justify-center lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>

            <GoogleLogin onSuccess={onGoogleLoginSuccess} onError={() => {}} />
          </div>
        </div>
      </div>
    </>
  );
}
