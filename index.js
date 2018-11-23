import path from 'path'
import config from './config'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackConfig from './webpack.config'

const app = express();
const STATIC = path.resolve(__dirname, './www');

if (process.env['NODE_ENV'] === 'development') {
  const compiler = webpack(webpackConfig)
  app.use(webpackDevMiddleware(compiler, {
    publicPath: '/'
  }));
}

app.use(express.static(STATIC));

app.get('/', (req, res) => {
   res.sendFile(`${STATIC}/index.html`)
});

app.post('/socket/config', (req, res) => {
  res.send(config.server)
});

app.listen(config.server.port, config.server.host, () => {
  console.log(`Server started: ${config.server.port}:${config.server.host}`)
});