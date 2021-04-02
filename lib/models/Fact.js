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

  static async retrieveById(id) {
    const { rows } = await pool.query('SELECT * FROM facts WHERE id=$1', [id]);
    return new Fact(rows[0]);
  }

  static async update(fact, id) {
    const { rows } = await pool.query(
      `
      UPDATE facts
      SET content=$1, validity=$2, contributor_id=$3
      WHERE id=$4
      RETURNING *
      `,
      [fact.content, fact.validity, fact.contributorId, id]
    );
    return new Fact(rows[0]);
  }

  static async deleteById(id) {
    const {
      rows,
    } = await pool.query('DELETE FROM facts WHERE id=$1 RETURNING *', [id]);
    return new Fact(rows[0]);
  }
};
