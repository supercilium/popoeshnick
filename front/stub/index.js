/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const pino = require('express-pino-logger')();
const login = require('./login');
const register = require('./reg');
const profile = require('./profile');
const recovery = require('./recovery');

const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser()); // for parsing cookies
app.use(pino);

app.post('/api/user/login/', (req, res) => {
  const result = login(req);
  res.setHeader('Content-Type', 'application/json');
  if (result.cookie) {
    res.cookie(result.cookie.key, result.cookie.value);
  }
  res.send(JSON.stringify(result.body));
});

app.post('/api/user/registration/', (req, res) => {
  const result = register(req);
  res.setHeader('Content-Type', 'application/json');
  if (result.cookie) {
    res.cookie(result.cookie.key, result.cookie.value);
  }
  res.send(JSON.stringify(result.body));
});

app.get('/api/user/profile/', (req, res) => {
  const result = profile(req.cookies);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(result.body));
});

app.post('/api/user/recovery/', (req, res) => {
  const result = recovery(req);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(result.body));
});

// eslint-disable-next-line no-console
app.listen(4000, () => console.log('Express server is running on localhost:4000'));
