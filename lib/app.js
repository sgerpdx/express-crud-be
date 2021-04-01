const express = require('express');
const pool = require('./utils/pool.js');
const app = express();
// app.use(cors());
// const superagent = require('superagent');

app.use(express.json());

//this is the basic unit framework, in this case for [get + /]
//app.get('/', (req, res) => {});

app.get('/facts', async (req, res) => {
  console.log('hey');
  try {
    const data = await pool.query('SELECT * from facts');

    res.json(data.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
