import replace from 'replace-in-file';
import path from 'path'

export function replaceVariables(userOptions) {
  const directory = process.cwd();
  const optionsPackageJson = {
    files: path.resolve(new URL(directory).pathname, 'package.json'),
    from: /projectname-var/g,
    to: userOptions.projectName,
  };
  const optionsWebpack = {
    files: path.resolve(new URL(directory).pathname, 'webpack.config.js'),
    from: /projectname-var/g,
    to: userOptions.projectName,
  };
  replace.sync(optionsPackageJson);
  replace.sync(optionsWebpack);
}
