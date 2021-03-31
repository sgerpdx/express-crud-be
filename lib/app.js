const express = require('express');
const app = express();

app.use(express.json());

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

//this is the basic unit framework, in this case for [get + /]
//app.get('/', (req, res) => {});

//this is an example from the planet-server-two repo:
// app.get('/planets', async (req, res) => {
//     try {
//       const data = await client.query('SELECT * from planets');

//       res.json(data.rows);
//     } catch (e) {

//       res.status(500).json({ error: e.message });
//     }
//   });



module.exports = app;
