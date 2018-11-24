"use strict";

const path = require('path');
const CopyWebpack = require('copy-webpack-plugin');
const HtmlWebpack = require('html-webpack-plugin');
const ExtractText = require('extract-text-webpack-plugin');
const SpeedPlugin = require("speed-measure-webpack-plugin");
const CleanPlugin = require('clean-webpack-plugin')
const webpack = require('webpack');

const smp = new SpeedPlugin();

const config = {
  mode: 'development',
  entry: `./src/index.js`,
  output: {
    path: path.resolve('www'),
    filename: 'js/index.min.js',
  },
  devtool: 'inline-source-map',
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
  },
  module: {
    rules: [
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
          }
        }
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(html|vue)$/,
        exclude: /node_modules/,
        loader: "html-loader",
      },
    ]
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@vue': path.join(__dirname, 'src/vue/components'),
      '@page': path.join(__dirname, 'src/vue/pages')
    },
  },
  plugins:[
    new CleanPlugin(path.join(__dirname, 'www')),
    new CopyWebpack([
      'src/cordova.js',
      { from: 'src/img/', to: 'img'}
    ]),
    new HtmlWebpack({ template: `./src/index.html` }),
    new webpack.HashedModuleIdsPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, 'www'),
    port: 3000,
    open: 'Chrome',
  }
};

module.exports = smp.wrap(config)