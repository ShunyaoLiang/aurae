import express from 'express';
import morgan from 'morgan';
import { homePageData, Profiledata, reachOutNotif, setMood } from './functions';
import config from './config.json';

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.get('/setMood', (req, res, next) => {
  let { uId, mood } = req.query;
  const user = parseInt((uId as string));
  const moodNumber = parseInt((mood as string));
  res.json(setMood(user, moodNumber));
});

app.get('/summaryPage', (req, res, next) => {
  let { uId } = req.query;
  const user = parseInt((uId as string));
  res.json(homePageData(user));
});

app.get('/userProfile', (req, res, next) => {
  let { token, uId } = req.query;
  const userToken = parseInt((token as string));
  const user = parseInt((uId as string));
  res.json(Profiledata(userToken, user));
});

app.get('/reachOut', (req, res, next) => {
  let { token, uId } = req.query;
  const userToken = parseInt((token as string));
  const user = parseInt((uId as string));
  res.json(reachOutNotif(userToken, user));
});

app.get('/', (_, res) => {
  res.sendFile('/static/index.html')
});

const PORT: number = parseInt(process.env.PORT || config.port);
const HOST: string = process.env.IP || 'localhost';

app.listen(PORT, HOST, () => {
  console.log(`⚡️ Server listening on port ${PORT} at ${HOST}`);
});
