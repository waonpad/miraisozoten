import type { PlopTypes } from '@turbo/gen';

// RUN: yarn turbo gen <generator-name>

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('schema', {
    description: 'Adds a new schema',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the schema?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{kebabCase name}}/{{kebabCase name}}.schema.ts',
        templateFile: 'templates/feature/feature.schema.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/{{kebabCase name}}/index.ts',
        templateFile: 'templates/feature/index.ts.hbs',
      },
    ],
  });
}
