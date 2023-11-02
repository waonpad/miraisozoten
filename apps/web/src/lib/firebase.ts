import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

import { env } from '@/constants/env';

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

const firebaseAuth = getAuth();

const firebaseAuthProviders = {
  google: new GoogleAuthProvider(),
};

export * from 'firebase/app';
export * from 'firebase/auth';
export { firebaseApp, firebaseAuth, firebaseAuthProviders };
