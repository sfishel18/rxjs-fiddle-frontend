const { pick } = require('lodash');
const webpackMerge = require('webpack-merge');
const mainConfig = require('../webpack.config');

module.exports = {
  stories: ['../**/*.stories.[tj]sx'],
  webpackFinal: config => webpackMerge(config, pick(mainConfig, 'module', 'resolve'))
};
