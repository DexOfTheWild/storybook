import type { Task } from '../task';
import { exec } from '../utils/exec';

export const chromatic: Task = {
  description: 'Run Chromatic against the sandbox',
  dependsOn: ['build'],
  junit: true,
  async ready() {
    return false;
  },
  async run({ key, sandboxDir, builtSandboxDir }, { dryRun, debug }) {
    const tokenEnvVarName = `CHROMATIC_TOKEN_${key.toUpperCase().replace(/\/|-|\./g, '_')}`;
    const token = process.env[tokenEnvVarName];

    const command = `npx chromatic`;
    const flags = [
      `--debug`,
      `--exit-zero-on-changes`,
      `--storybook-build-dir=${builtSandboxDir}`,
      `--exit-once-uploaded`,
      `--projectToken=${token}`,
    ];

    await exec(`${command} ${flags.join(' ')} `, { cwd: sandboxDir }, { dryRun, debug });
  },
};