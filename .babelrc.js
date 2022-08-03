const path = require('path');
const jsConfig = require('./jsconfig.json');

module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: [path.resolve(jsConfig.compilerOptions.baseUrl)]
      }
    ]
  ]
};
