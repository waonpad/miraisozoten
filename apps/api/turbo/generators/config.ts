import type { PlopTypes } from '@turbo/gen';

// RUN: yarn turbo gen <generator-name>

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('dredd', {
    description: 'Add a new dredd hook files',
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
        path: 'test/dredd/{{kebabCase name}}/config.js',
        templateFile: 'templates/test/dredd/resource/config.js.hbs',
      },
      {
        type: 'add',
        path: 'test/dredd/{{kebabCase name}}/create-{{kebabCase name}}.hook.js',
        templateFile: 'templates/test/dredd/resource/create-resource.hook.js.hbs',
      },
      {
        type: 'add',
        path: 'test/dredd/{{kebabCase name}}/delete-{{kebabCase name}}.hook.js',
        templateFile: 'templates/test/dredd/resource/delete-resource.hook.js.hbs',
      },
      {
        type: 'add',
        path: 'test/dredd/{{kebabCase name}}/get-{{kebabCase name}}.hook.js',
        templateFile: 'templates/test/dredd/resource/get-resource.hook.js.hbs',
      },
      {
        type: 'add',
        path: 'test/dredd/{{kebabCase name}}/update-{{kebabCase name}}.hook.js',
        templateFile: 'templates/test/dredd/resource/update-resource.hook.js.hbs',
      },
    ],
  });
  plop.setGenerator('resource', {
    description: 'Add a new resource',
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
