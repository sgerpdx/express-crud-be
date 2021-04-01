const facts = require('../controllers/contributions');
const pool = require('../utils/pool');

module.exports = class Fact {
  id;
  content;
  validity;
  contributorId;

  constructor(row) {
    this.id = row.id;
    this.content = row.content;
    this.validity = row.validity;
    this.contributorId = row.contributor_id;
  }

  static async insert(fact) {
    const {
      rows,
    } = await pool.query(
      'INSERT INTO facts (content, validity, contributor_id) VALUES ($1, $2, $3) RETURNING *',
      [fact.content, fact.validity, fact.contributorId]
    );
    return new Fact(rows[0]);
  }

  static async retrieve() {
    const { rows } = await pool.query('SELECT * FROM facts');
    return rows.map((row) => new Fact(row));
  }
};