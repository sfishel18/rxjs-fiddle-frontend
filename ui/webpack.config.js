const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "app.tsx")
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build")
  },
  devtool: "inline-source-map",
  devServer: {
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, "index.html") }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
