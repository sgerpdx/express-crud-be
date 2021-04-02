const express = require('express');
const app = express();
// app.use(cors());
// const superagent = require('superagent');

app.use(express.json());

app.use('/api/v1/facts', require('./controllers/contributions'));

//this is the basic unit framework, in this case for [get + /]
//app.get('/', (req, res) => {});

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
