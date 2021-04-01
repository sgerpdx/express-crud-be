const contributions = require('../controllers/contributions');
const pool = require('../utils/pool');

module.exports = class Fact {
  id;
  content;
  validity;

  constructor(row) {
    this.id = row.id;
    this.content = row.content;
    this.validity = row.validity;
  }

  //   static async insert(fact) {
  //     const {
  //       rows,
  //     } = await pool.query(
  //       'INSERT INTO facts (content, validity) VALUES ($1, $2) RETURNING *',
  //       [fact.content, fact.validity]
  //     );
  //     return new Order(rows[0]);
  //   }

  static async retrieve() {
    const { rows } = await pool.query('SELECT * FROM facts');
    return rows.map((row) => new Fact(row));
  }
};
