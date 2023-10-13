import type { PlopTypes } from '@turbo/gen';

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // A simple generator to add a new React component to the internal UI library
  plop.setGenerator('react-component', {
    description: 'Adds a new react component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the component?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: './components/{{pascalCase name}}/{{pascalCase name}}.tsx', // 作るパス
        templateFile: 'templates/component.hbs',
      },
      {
        type: 'append',
        path: 'index.tsx', // どのファイルに追記するか
        pattern: /(?<insertion>\/\/ component exports)/g,
        template: 'export * from "./components/{{pascalCase name}}/{{pascalCase name}}";', // 追記する内容
      },
    ],
  });
}
