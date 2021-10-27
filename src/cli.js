import arg from 'arg';
import inquirer from 'inquirer';
import { createProject } from './main';

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--help': Boolean,
      '-h': '--help',
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    template: args._[0],
    help: args['--help'] || false,
  };
}

async function promptForMissingOptions(options) {
  const questions = [];
  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message:
        'Escolha se o projeto será consumidor (host) ou será consumido (remote).',
      choices: ['host', 'remote'],
    });
  }
  questions.push({
    type: 'input',
    name: 'projectName',
    message: 'Escolha o nome do projeto',
  });
  questions.push({
    type: 'list',
    name: 'packageManager',
    message: 'Escolha o gerenciador de pacotes que deseja utilizar',
    choices: ['yarn', 'npm'],
  });
  const answers = await inquirer.prompt(questions);
  return {
    ...answers,
    template: options.template || answers.template,
  };
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  await createProject(options);
}
