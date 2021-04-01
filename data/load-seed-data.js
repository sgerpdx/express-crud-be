const client = require('../lib/client');
const { facts } = require('./facts.js');
const usersData = require('./users.js');
const { getEmoji } = require('../lib/emoji.js');

run();

async function run() {
  try {
    await client.connect();

    const users = await Promise.all(
      usersData.map((user) => {
        return client.query(
          `
                      INSERT INTO users (email, hash)
                      VALUES ($1, $2)
                      RETURNING *;
                  `,
          [user.email, user.hash]
        );
      })
    );

    const user = users[0].rows[0];

    //destructure this for cleaner code, per Else-By-Elsewhere
    await Promise.all(
      facts.map((fact) => {
        return client.query(
          `
                    INSERT INTO facts (content, validity, contributor_id)
                    VALUES ($1, $2, $3);
                `,
          [fact.content, fact.validity, fact.contributor_id]
        );
      })
    );

    console.log('seed data load complete', getEmoji(), getEmoji(), getEmoji());
  } catch (err) {
    console.log(err);
  } finally {
    client.end();
  }
}
