const mainConfig = require('../webpack.config');

module.exports = {
  stories: ['../**/*.stories.[tj]sx'],
  webpackFinal: config => ({
    ...config,
    module: mainConfig.module,
    resolve: mainConfig.resolve,
  })
};
