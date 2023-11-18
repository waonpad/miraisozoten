import { initializeApp, getApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, GoogleAuthProvider } from 'firebase/auth';

import { env } from '@/constants/env';

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

const firebaseApp = (() => {
  if (getApp()) {
    console.warn('Firebase app already initialized');

    return getApp();
  }
  console.log('Firebase app initialized');

  return initializeApp(firebaseConfig);
})();

const firebaseAuth = getAuth();
(env.VITE_FIREBASE_EMULATOR_ENABLED === 'true' || env.VITE_API_MOCKING === 'true') &&
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  connectAuthEmulator(firebaseAuth, `http://${env.VITE_FIREBASE_AUTH_EMULATOR_HOST}`);

const firebaseAuthProviders = {
  google: new GoogleAuthProvider(),
};

export * from 'firebase/app';
export * from 'firebase/auth';
export { firebaseApp, firebaseAuth, firebaseAuthProviders };
