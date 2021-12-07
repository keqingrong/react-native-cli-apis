# @keqingrong/react-native-cli-apis (WIP)

[![npm version](https://img.shields.io/npm/v/@keqingrong/react-native-cli-apis.svg)](https://www.npmjs.com/package/@keqingrong/react-native-cli-apis)

Programmatic APIs for React Native CLI

## Installation

```bash
# npm
npm install @keqingrong/react-native-cli-apis

# yarn
yarn add @keqingrong/react-native-cli-apis
```

## Usage

```ts
import { bundle, setPATH } from '@keqingrong/react-native-cli-apis';

(async () => {
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
})();
```

## APIs

- `bundle(config)` Builds the JavaScript bundle for offline use
- `version()` Print React Native CLI version

## License

MIT © Qingrong Ke
