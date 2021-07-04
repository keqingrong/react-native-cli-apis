import path from 'path';
import { ensureDir } from 'fs-extra';
import decamelize from 'decamelize';
import { SpawnOptions } from 'child_process';
import { spawnAsync } from '@keqingrong/npm-apis';
import { cmd } from '../variables';

interface Config {
  /** Path to the root JS file, either absolute or relative to JS root. */
  entryFile: string;
  /** Either "ios" or "android". */
  platform: 'ios' | 'android';
  /** Specify a custom transformer to be used. */
  transformer: string;
  /** If false, warnings are disabled and the bundle is minified. */
  dev: boolean;
  /**
   * Allows overriding whether bundle is minified. This defaults to false
   * if dev is true, and true if dev is false. Disabling minification can
   * be useful for speeding up production builds for testing purposes.
   */
  minify: boolean;
  /**
   * File name where to store the resulting bundle, ex. `/tmp/groups.bundle`.
   *
   * If you are planning on building a debug APK, that will run without the
   * packager, by invoking `./gradlew assembleDebug` you can simply set
   * `bundleInDebug: true` in your `app/build.gradle` file, inside the
   * `project.ext.react` map.
   */
  bundleOutput: string;
  /**
   * Encoding the bundle should be written in
   * (https://nodejs.org/api/buffer.html#buffer_buffer).
   */
  bundleEncoding: string;
  /**
   * Specifies the maximum number of workers the worker-pool will spawn for
   * transforming files. This defaults to the number of the cores available
   * on your machine.
   */
  maxWorkers: number;
  /**
   * File name where to store the sourcemap file for resulting bundle, ex.
   * `/tmp/groups.map`.
   */
  sourcemapOutput: string;
  /** Path to make sourcemaps sources entries relative to, ex. `/root/dir`. */
  sourcemapSourcesRoot: string;
  /** Report SourceMapURL using its full path. */
  sourcemapUseAbsolutePath: boolean;
  /** Directory name where to store assets referenced in the bundle. */
  assetsDest: string;
  /** Removes cached files. */
  resetCache: boolean;
  /** Try to fetch transformed JS code from the global cache, if configured. */
  readGlobalCache: boolean;
  /** Path to the CLI configuration file. */
  config: string;
}

type ConfigName = keyof Config;

/**
 * Builds the JavaScript bundle for offline use.
 * ```sh
 * react-native bundle <flag>
 * ```
 * @see https://github.com/react-native-community/cli/blob/master/docs/commands.md#bundle
 */
const bundle = async (config: Partial<Config>, options: SpawnOptions = {}) => {
  const args = ['bundle'];

  const filenames = [
    config.bundleOutput,
    config.sourcemapOutput,
    config.assetsDest
  ].filter((item = ''): item is string => item.length > 0);

  for await (const filename of filenames) {
    await ensureDir(path.dirname(filename));
  }

  if (config) {
    const keys = Object.keys(config);
    if (keys.length > 0) {
      keys
        .filter((_key): _key is ConfigName => true)
        .forEach(key => {
          const value = config[key];
          const isShorthand = key.length === 1;
          const prefix = isShorthand ? '-' : '--';
          const dashedKey = isShorthand
            ? key
            : decamelize(key, { separator: '-' });
          if (value !== undefined) {
            const rest = value === true ? '' : `=${value}`;
            args.push(`${prefix}${dashedKey}${rest}`);
          }
        });
    }
  }

  return spawnAsync(cmd, args, {
    stdio: 'inherit',
    ...options
  });
};

export { Config as BundleConfig, bundle };
