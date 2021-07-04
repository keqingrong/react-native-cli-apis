const chalk = require('chalk');
const {bundle, setPATH} = require('../../dist');
const info = (message = '') => console.info(chalk.cyanBright('info'), message);

async function main() {
  /** @type {import('../../dist').BundleConfig} */
  const config = {
    entryFile: 'index.js',
    platform: 'android',
    dev: false,
    resetCache: false,
    bundleOutput: './build/index.android.jsbundle',
    sourcemapOutput: './build/index.android.map',
    assetsDest: './build/assets',
  };
  const basePath = __dirname;
  const spawnOptions = {
    cwd: basePath,
    env: setPATH(basePath, process.env),
  };

  info('Building bundle for Android\n');
  await bundle(config, spawnOptions);
  info('Done building bundle for Android');
}

main();
