// jest.config.js
// https://github.com/react-native-training/react-native-elements/issues/1595
const { jsWithBabel: tsjPreset } = require('ts-jest/presets');

module.exports = {
  ...tsjPreset,
  preset: 'react-native',
  transform: {
    ...tsjPreset.transform,
    '\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  },
  globals: {
    'ts-jest': {
      babelConfig: true,
      useBabelrc: true,
      tsConfigFile: "tsconfig.jest.json",
    }
  },
  cacheDirectory: '.jest/cache',
};