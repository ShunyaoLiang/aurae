import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { homePageData, Profiledata, reachOutNotif, setMood } from './functions';
import config from './config.json';

const app = express();
app.use(express.json());
app.use(morgan('dev'));

// Mount static files in public to be accessible from the prefix static.
app.use('/static', express.static(path.join(__dirname, 'public')));
app.set('views', './views');
app.set('view engine', 'pug');

app.post('/setMood', (req, res, next) => {
  const { uId, mood } = req.body
  res.json(setMood(uId, mood));
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

// The home page.
app.get('/', (req, res) => {
  const token = req.query.token;
  // Shockingly, this seems to be the idiomatic way to do this.
  // Express.js is a travesty of engineering.
  res.sendFile(path.join(__dirname, '../views/', 'index.html'));
});

// User profiles.
app.get('/users/:id', (req, res) => {
  const token = parseInt(req.query.token as string);
  const id = parseInt(req.params.id);
  const profile = Profiledata(token, id);
  res.render('user', { id: id, profile: profile });
});

const PORT: number = parseInt(process.env.PORT || config.port);
const HOST: string = process.env.IP || 'localhost';

app.listen(PORT, HOST, () => {
  console.log(`⚡️ Server listening on port ${PORT} at ${HOST}`);
});
