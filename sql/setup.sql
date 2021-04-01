DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS facts;

              CREATE TABLE users (
                    id SERIAL PRIMARY KEY NOT NULL,
                    email TEXT NOT NULL
                );         
                CREATE TABLE facts (
                    id SERIAL PRIMARY KEY NOT NULL,
                    content TEXT NOT NULL,
                    validity BOOLEAN NOT NULL,
                    contributor_id INTEGER NOT NULL REFERENCES users(id)
            );

                      INSERT INTO users (email)
                      VALUES ('com@dot.com')
                      ;

