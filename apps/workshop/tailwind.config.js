const baseConfig = require('../../packages/tailwind-config/tailwind.config');

module.exports = {
  ...baseConfig,
  content: {
    files: ['./src/**/*.{js,ts,jsx,tsx,mdx}', '../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}'],
  },
};
