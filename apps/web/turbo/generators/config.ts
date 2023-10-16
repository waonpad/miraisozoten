import type { PlopTypes } from '@turbo/gen';

// RUN: yarn turbo gen <generator-name>

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('feature', {
    description: 'Adds a new feature to pages',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the path?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: './src/pages/{{kebabCase name}}s/index.tsx',
        templateFile: 'templates/pages/features/index.tsx.hbs',
      },
      {
        type: 'add',
        path: './src/pages/{{kebabCase name}}s/create/index.tsx',
        templateFile: 'templates/pages/features/create/index.tsx.hbs',
      },
      {
        type: 'add',
        path: './src/pages/{{kebabCase name}}s/[id]/index.tsx',
        templateFile: 'templates/pages/features/[id]/index.tsx.hbs',
      },
      {
        type: 'add',
        path: './src/pages/{{kebabCase name}}s/[id]/update/index.tsx',
        templateFile: 'templates/pages/features/[id]/update/index.tsx.hbs',
      },
      {
        type: 'add',
        path: './src/pages/{{kebabCase name}}s/_/api/create-{{kebabCase name}}.ts',
        templateFile: 'templates/pages/features/_/api/create-feature.ts.hbs',
      },
      {
        type: 'add',
        path: './src/pages/{{kebabCase name}}s/_/api/delete-{{kebabCase name}}.ts',
        templateFile: 'templates/pages/features/_/api/delete-feature.ts.hbs',
      },
      {
        type: 'add',
        path: './src/pages/{{kebabCase name}}s/_/api/get-{{kebabCase name}}.ts',
        templateFile: 'templates/pages/features/_/api/get-feature.ts.hbs',
      },
      {
        type: 'add',
        path: './src/pages/{{kebabCase name}}s/_/api/get-{{kebabCase name}}s.ts',
        templateFile: 'templates/pages/features/_/api/get-features.ts.hbs',
      },
      {
        type: 'add',
        path: './src/pages/{{kebabCase name}}s/_/api/get-{{kebabCase name}}s-with-pages.ts',
        templateFile: 'templates/pages/features/_/api/get-features-with-pages.ts.hbs',
      },
      {
        type: 'add',
        path: './src/pages/{{kebabCase name}}s/_/api/update-{{kebabCase name}}.ts',
        templateFile: 'templates/pages/features/_/api/update-feature.ts.hbs',
      },
      {
        type: 'add',
        path: './src/pages/{{kebabCase name}}s/_/components/create-{{kebabCase name}}.tsx',
        templateFile: 'templates/pages/features/_/components/create-feature.tsx.hbs',
      },
      {
        type: 'add',
        path: './src/pages/{{kebabCase name}}s/_/components/delete-{{kebabCase name}}.tsx',
        templateFile: 'templates/pages/features/_/components/delete-feature.tsx.hbs',
      },
      {
        type: 'add',
        path: './src/pages/{{kebabCase name}}s/_/components/update-{{kebabCase name}}.tsx',
        templateFile: 'templates/pages/features/_/components/update-feature.tsx.hbs',
      },
      {
        type: 'add',
        path: './src/pages/{{kebabCase name}}s/_/components/{{kebabCase name}}-list.tsx',
        templateFile: 'templates/pages/features/_/components/feature-list.tsx.hbs',
      },
      {
        type: 'add',
        path: './src/pages/{{kebabCase name}}s/_/components/{{kebabCase name}}-list-item.tsx',
        templateFile: 'templates/pages/features/_/components/feature-list-item.tsx.hbs',
      },
      {
        type: 'add',
        path: './src/pages/{{kebabCase name}}s/_/components/infinite-{{kebabCase name}}-list.tsx',
        templateFile: 'templates/pages/features/_/components/infinite-feature-list.tsx.hbs',
      },
      {
        type: 'modify',
        path: './src/lib/react-query/query-keys.ts',
        pattern: /(} as const;\n)$/g,
        template: `  {{constantCase name}}S: \'{{kebabCase name}}s\',\n$1`,
      },
    ],
  });
}
