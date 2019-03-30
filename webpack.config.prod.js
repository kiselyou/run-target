"use strict";

const path = require('path');
const CopyWebpack = require('copy-webpack-plugin');
const HtmlWebpack = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ExtractText = require('extract-text-webpack-plugin');
const WebpackClean = require('webpack-clean');

const config = {
  mode: 'production',
  entry: `./src/index.js`,
  output: {
    path: path.resolve('www'),
    filename: 'js/index.min.js',
  },
  optimization: {
    minimizer: [new TerserPlugin({
      sourceMap: true
    })]
  },
  devtool: 'source-map',
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'babel-loader'
      //   }
      // },
      {
        test: [
          /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        ],
        use: {
          loader: "file-loader",
          options: {
            name: "../fonts/[name].[ext]",
          }
        }
      },
      {
        test: [
          /\.(gif|png|jpe?g|svg)$/
        ],
        use: {
          loader: "file-loader",
          options: {
            name: "img/[name].[ext]",
          }
        }
      },
      {
        test: /\.scss$/,
        use: ExtractText.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
            }
          ]
        })
      },
      {
        test: /\.(html)$/,
        exclude: /node_modules/,
        loader: "html-loader",
      },
      {
        test: /\.(vue)$/,
        loader: [
          'vue-loader',
          'vue-style-loader',
          'css-loader'
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@vue': path.join(__dirname, 'src/vue/components'),
      '@page': path.join(__dirname, 'src/vue/pages'),
      '@module': path.join(__dirname, 'src/vue/modules'),
      '@storage': path.join(__dirname, 'src/storage'),
      '@lib': path.join(__dirname, 'src/libs'),
      '@config': path.join(__dirname, 'src/config'),
      '@api': path.join(__dirname, 'src/api')
    },
  },
  plugins:[
    new CopyWebpack([
      'src/favicon.ico',
      'src/cordova.js',
      { from: 'src/img/', to: 'img'},
      { from: 'src/fonts/', to: 'fonts'},
    ]),
    new ExtractText('css/styles.min.css'),
    new HtmlWebpack({ template: `./src/index.html` }),
  ],
};

module.exports = config