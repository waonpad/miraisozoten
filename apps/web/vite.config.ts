import react from '@vitejs/plugin-react';
import { UserConfig, defineConfig, loadEnv } from 'vite';
import generouted from '@generouted/react-router/plugin';
import yaml from '@rollup/plugin-yaml';
import path from 'path';
import type { UserConfig as VitestUserConfig } from 'vitest/dist/config.js';
import svgr from 'vite-plugin-svgr';

const createEnv = require('./src/constants/env/create-env').createEnv;

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  process.env =
    process.env.VITE_APP_ENV !== 'production'
      ? { ...process.env, ...loadEnv('test.local', process.cwd()) }
      : process.env;

  // Env Variables Validation
  createEnv({ runtimeEnv: process.env });

  return defineConfig({
    plugins: [react(), htmlPlugin(process.env), yaml(), generouted(), svgr()],
    resolve: { alias: { '@': '/src' } },
    server: {
      port: 8080,
    },
    test: {
      globals: true,
      environment: 'happy-dom',
      include: ['src/**/*.test.{js,ts,jsx,tsx}'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
      setupFiles: ['./src/setup-tests.ts'],
    },
  } as UserConfig & { test: VitestUserConfig['test'] });
};

/**
 * Replace env variables in index.html
 * @see https://github.com/vitejs/vite/issues/3105#issuecomment-939703781
 * @example `%VITE_MY_ENV%`
 * @see https://vitejs.dev/guide/api-plugin.html#transformindexhtml
 */
function htmlPlugin(env: ReturnType<typeof loadEnv>) {
  return {
    name: 'html-transform',
    transformIndexHtml: {
      enforce: 'pre' as const,
      transform: (html: string): string =>
        html.replace(/%(.*?)%/g, (match, p1) => env[p1] ?? match),
    },
  };
}
