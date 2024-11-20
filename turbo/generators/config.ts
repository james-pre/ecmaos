import { PlopTypes } from '@turbo/gen'

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('device', {
    description: 'Creates a new device',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the new device?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '{{ turbo.paths.root }}/devices/{{ dashCase name }}/package.json',
        templateFile: 'templates/device/package.json.hbs',
      },
      {
        type: 'add',
        path: '{{ turbo.paths.root }}/devices/{{ dashCase name }}/src/index.ts',
        templateFile: 'templates/device/src/index.ts.hbs',
      },
      {
        type: 'add',
        path: '{{ turbo.paths.root }}/devices/{{ dashCase name }}/tsconfig.json',
        templateFile: 'templates/device/tsconfig.json.hbs',
      },
    ],
  })
}
