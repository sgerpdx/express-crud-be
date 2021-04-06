const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Fact = require('../lib/models/Fact');
// const cors = require('../lib/app');

//per Patrick
jest.mock('aws-sdk/clients/ses', () => {
  const mSES = {
    sendEmail: jest.fn().mockReturnThis(),
    promise: jest.fn(),
    // then: ()=>{}
  };
  return jest.fn(() => mSES);
});

describe('express-crud-be routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  let fact;
  beforeEach(async () => {
    fact = await Fact.insert({
      content: 'nougat is good',
      validity: true,
      contributorId: 1,
    });
    await Fact.insert({
      content: 'nougat is bad',
      validity: false,
      contributorId: 1,
    });
  });

  it('creates a new fact and sends an email', () => {
    return request(app)
      .post('/api/v1/facts')
      .send({
        content: 'NASA invented nougat',
        validity: false,
        contributorId: 1,
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: 3,
          content: 'NASA invented nougat',
          validity: false,
          contributorId: 1,
        });
      });
  });

  it('gets all facts in the database', () => {
    return request(app)
      .get('/api/v1/facts')
      .then((res) => {
        expect(res.body).toEqual(
          expect.arrayContaining([
            {
              id: 1,
              content: 'nougat is good',
              validity: true,
              contributorId: 1,
            },
            {
              id: 2,
              content: 'nougat is bad',
              validity: false,
              contributorId: 1,
            },
          ])
        );
      });
  });

  it('gets a fact by id', () => {
    return request(app)
      .get('/api/v1/facts/2')
      .then((res) => {
        expect(res.body).toEqual({
          id: 2,
          content: 'nougat is bad',
          validity: false,
          contributorId: 1,
        });
      });
  });

  it('gets an html file', () => {
    return request(app)
      .get(`${__dirname}/../public`)
      .then((res) => {
        expect(res.body).toEqual(<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta http-equiv="X-UA-Compatible" content="ie=edge" />
              <link rel="preconnect" href="https://fonts.gstatic.com" />
              <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap"
                rel="stylesheet"
              />
              <link rel="stylesheet" href="./nougat/nougat.css" />
              <title>Entre Nougat</title>
            </head>
          
            <body>
              <header><h2>The Many Truths of Nougat</h2></header>
              <main>
                <p>Do you know any interesting nougat-based facts? Please share:</p>
                <form id="fact-share">
                  <input type="text" />
                  <button>Submit</button>
                </form>
                <div id="ghost-text"></div>
                <ul id="facts"></ul>
              </main>
              <script type="module" src="./nougat/nougat.js"></script>
            </body>
          </html>);
      });
  });

  it('updates an existing fact by id and sends an email', () => {
    return request(app)
      .put('/api/v1/facts/2')
      .send({
        content: 'nougat is bad',
        validity: true,
        contributorId: 1,
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: 2,
          content: 'nougat is bad',
          validity: true,
          contributorId: 1,
        });
      });
  });

  it('deletes a fact by id', () => {
    return request(app)
      .delete(`/api/v1/facts/${fact.id}`)
      .then((res) => {
        console.log(res.body);
        expect(res.body).toEqual(fact);
      });
  });
});
