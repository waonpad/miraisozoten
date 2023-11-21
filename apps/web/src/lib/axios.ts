import Axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { env } from '@/constants/env';

import { firebaseAuth } from './firebase';

async function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  config.headers.Accept = config.headers.Accept || 'application/json';
  config.headers.Authorization =
    config.headers.Authorization ||
    (firebaseAuth.currentUser
      ? `Bearer ${await firebaseAuth.currentUser.getIdToken()}`
      : undefined);
  return config;
}

export const axios: AxiosInstance = Axios.create({
  baseURL: env.VITE_API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
  },
  (error: AxiosError) => {
    // error.response?.data の中身がバックから送られてきたエラーの本体
    console.log(error.response?.data);

    return Promise.reject(error);
  }
);
