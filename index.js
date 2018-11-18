import path from 'path'
import config from './config'
import express from 'express'

const app = express();

const STATIC = path.resolve(__dirname, './www');

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