"use strict";

const path = require('path');
const CopyWebpack = require('copy-webpack-plugin');
const HtmlWebpack = require('html-webpack-plugin');
const UglifyJs = require('uglifyjs-webpack-plugin');
const ExtractText = require('extract-text-webpack-plugin');
const WebpackClean = require('webpack-clean');

const config = {
  mode: 'production',
  entry: `./src/index.js`,
  output: {
    path: path.resolve('www'),
    filename: 'js/index.min.js',
  },
  devtool: 'inline-source-map',
  // optimization: {
  //   minimizer: [new UglifyJs()]
  // },
  module: {
    rules: [
      {
        test: [
          /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        ],
        use: {
          loader: "file-loader",
          options: {
            name: "fonts/[name].[ext]",
          }
        }
      },
      {
        test: [
          /\.(gif|png|jpe?g|svg)$/
        ],
        exclude: /open-iconic\.svg$/,
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
    new CopyWebpack([
      'src/favicon.ico',
      'src/cordova.js',
      { from: 'src/img/', to: 'img'},
      { from: 'node_modules/open-iconic/font/css/open-iconic-bootstrap.min.css', to: 'css'},
      { from: 'node_modules/open-iconic/font/fonts/**', to: 'fonts/[name].[ext]'},
    ]),
    new ExtractText('css/styles.min.css'),
    new HtmlWebpack({ template: `./src/index.html` }),
  ],
};

module.exports = config