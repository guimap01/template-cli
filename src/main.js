import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';
import { replaceVariables } from './replaceVariabless';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  });
}

export async function createProject(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  };

  const currentFileUrl = import.meta.url;

  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    '../../templates',
    options.template.toLowerCase()
  );
  options.templateDirectory = templateDir.slice(3);
  try {
    await access(options.templateDirectory, fs.constants.R_OK);
  } catch (error) {
    console.log(`error`, error);
    console.error('%s Invalid template name', chalk.red.bold('ERROR'));
    process.exit(1);
  }

  const taksList = [
    {
      title: 'Copiando arquivos do projeto',
      task: () => copyTemplateFiles(options),
    },
    {
      title: 'Aplicando as variaveis',
      task: () => replaceVariables(options),
    },
    {
      title: 'Instalando as dependencias',
      task: () =>
        projectInstall({
          cwd: options.targetDirectory,
          prefer: options.packageManager || 'yarn',
        }),
    },
  ];

  const tasks = new Listr(taksList);

  await tasks.run();

  console.log('%s Project ready', chalk.green.bold('DONE'));
  return true;
}
