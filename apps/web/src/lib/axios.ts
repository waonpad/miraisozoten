import Axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { COOKIE_NAMES } from '@/constants/cookie-names';
import { env } from '@/constants/env';
import { getCookie } from '@/utils/cookie/get-cookie';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  config.headers.Accept = config.headers.Accept || 'application/json';
  config.headers.Authorization =
    config.headers.Authorization || `Bearer ${getCookie(COOKIE_NAMES.AUTH_TOKEN)}`;
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
  (error) => {
    console.log(error);

    return Promise.reject(error);
  }
);
