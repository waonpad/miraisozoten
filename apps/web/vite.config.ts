import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import generouted from '@generouted/react-router/plugin';
import yaml from '@rollup/plugin-yaml';

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
    plugins: [
      react(),
      yaml(),
      generouted({
        source: {
          routes: './src/pages/**/[\\w[-]*.{jsx,tsx}',
          modals: './src/pages/**/[+]*.{jsx,tsx}',
        },
        output: './src/router.ts',
      }),
    ],
    resolve: { alias: { '@': '/src' } },
    server: {
      port: 8080,
    },
  });
};
