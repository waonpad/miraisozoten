import type { PlopTypes } from '@turbo/gen';

// RUN: yarn turbo gen <generator-name>

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('resource', {
    description: 'Adds a new resource',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the resource?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{kebabCase name}}/{{kebabCase name}}.module.ts',
        templateFile: 'templates/resource/resource.module.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/{{kebabCase name}}/{{kebabCase name}}.controller.ts',
        templateFile: 'templates/resource/resource.controller.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/{{kebabCase name}}/{{kebabCase name}}.controller.spec.ts',
        templateFile: 'templates/resource/resource.controller.spec.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/{{kebabCase name}}/{{kebabCase name}}.service.ts',
        templateFile: 'templates/resource/resource.service.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/{{kebabCase name}}/{{kebabCase name}}.service.spec.ts',
        templateFile: 'templates/resource/resource.service.spec.ts.hbs',
      },
    ],
  });
}
