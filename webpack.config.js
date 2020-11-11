const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { get } = require('lodash');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'app.tsx'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'build'),
  },
  devtool: 'inline-source-map',
  devServer: {
    headers: {
      'Set-Cookie': `API_URL=${get(process.env, 'API_URL', 'http://api-staging.rxjs-fiddle.com')}`,
    },
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      favicon: 'favicon.ico',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    minimizer: [new TerserPlugin()],
  },
};
