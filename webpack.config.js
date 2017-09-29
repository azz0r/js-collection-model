/* global __dirname, require, module*/

const webpack = require("webpack")
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
const path = require("path")
const env = require("yargs").argv.env // use --env with webpack 2

const libraryName = "jsCollectionModel"

const config = {
  entry: {
    bundle: "./src/index.js",
    "bundle.min": "./src/index.js",
  },
  devtool: false,
  output: {
    path: __dirname + "/lib",
    filename: "[name].js",
    library: libraryName,
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: "babel-loader",
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    modules: [path.resolve("./node_modules"), path.resolve("./src"),],
    extensions: [".json", ".js",],
  },
  plugins: [
    new UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true,
      parallel: {
        cache: true,
        workers: 2,
      },
    }),
  ],
}

module.exports = config
