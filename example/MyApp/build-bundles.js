const chalk = require('chalk');
const {bundle, version, setPATH} = require('../../dist');
const info = (message = '') => console.info(chalk.cyanBright('info'), message);

async function main() {
  /** @type {Array<import('../../dist').BundleConfig>} */
  const configs = [
    {
      entryFile: 'index.js',
      platform: 'android',
      dev: false,
      resetCache: false,
      bundleOutput: './build/index.android.jsbundle',
    },
    {
      entryFile: 'index.js',
      platform: 'ios',
      dev: false,
      resetCache: false,
      bundleOutput: './build/index.ios.jsbundle',
    },
  ];

  const basePath = __dirname;
  const spawnOptions = {
    cwd: basePath,
    env: setPATH(basePath, process.env),
  };

  info('React Native CLI version');
  await version();

  for await (let config of configs) {
    switch (config.platform) {
      case 'android': {
        info('Building bundle for Android\n');
        await bundle(config, spawnOptions);
        info('Done building bundle for Android');
        break;
      }
      case 'ios': {
        info('Building bundle for iOS\n');
        await bundle(config, spawnOptions);
        info('Done building bundle for iOS');
        break;
      }
    }
  }

  info('All done');
}

main();
