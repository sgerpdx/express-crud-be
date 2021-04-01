const client = require('../lib/client');
const { getEmoji } = require('../lib/emoji.js');

run();

async function run() {
  try {
    await client.connect();

    await client.query(` 
              CREATE TABLE users (
                    id SERIAL PRIMARY KEY NOT NULL,
                    email TEXT NOT NULL,
                    hash TEXT NOT NULL
                );         
                CREATE TABLE facts (
                    id SERIAL PRIMARY KEY NOT NULL,
                    content TEXT NOT NULL,
                    validity BOOLEAN NOT NULL,
                    contributor_id INTEGER NOT NULL REFERENCES users(id)
            );
        `);

    console.log('create tables complete', getEmoji(), getEmoji(), getEmoji());
  } catch (err) {
    // problem? let's see the error...
    console.log(err);
  } finally {
    // success or failure, need to close the db connection
    client.end();
  }
}
