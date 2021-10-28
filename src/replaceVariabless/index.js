import replace from 'replace-in-file';
import path from 'path'

export function replaceVariables(userOptions) {
  const directory = process.cwd();
  const options = {
    files: path.resolve(new URL(directory).pathname, 'package.json'),
    from: /{projectName}/g,
    to: userOptions.projectName,
  };
  replace.sync(options);
}
