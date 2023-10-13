import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import generouted from '@generouted/react-router/plugin';

const createEnv = require('./src/constants/env/createEnv').createEnv;

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  // Env Variables Validation
  createEnv({ runtimeEnv: process.env });

  return defineConfig({
    plugins: [
      react(),
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
