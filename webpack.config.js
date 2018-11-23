"use strict";

if (process.env['NODE_ENV'] === 'development') {
  module.exports = require('./webpack/webpack.config.dev');
} else {
  module.exports = require('./webpack/webpack.config.prod');
}