/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const login = require('./login');

const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.post('/api/user/login/', (req, res) => {
  const result = login(req);
  // const name = req.query.email || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(result));
});

// eslint-disable-next-line no-console
app.listen(4000, () => console.log('Express server is running on localhost:4000'));
