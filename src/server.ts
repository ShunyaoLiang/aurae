import express from 'express';
import morgan from 'morgan';

import config from './config.json';

const app = express();
app.use(express.json());
app.use(morgan('dev'));

// IDK how this works.
app.use('/static', express.static('static'));
app.use(express.static('static'));

app.get('/', (_, res) => {
  res.sendFile('/static/index.html')
});

const PORT: number = parseInt(process.env.PORT || config.port);
const HOST: string = process.env.IP || 'localhost';

app.listen(PORT, HOST, () => {
  console.log(`⚡️ Server listening on port ${PORT} at ${HOST}`);
});
