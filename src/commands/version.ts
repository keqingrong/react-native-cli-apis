import { SpawnOptions } from 'child_process';
import { spawnAsync } from '@keqingrong/npm-apis';
import { cmd } from '../variables';

/**
 * Print React Native CLI version.
 * ```sh
 * react-native --version
 * ```
 */
const version = async (options: SpawnOptions = {}) => {
  const args = ['--version'];

  return spawnAsync(cmd, args, {
    stdio: 'inherit',
    ...options
  });
};

export { version };
