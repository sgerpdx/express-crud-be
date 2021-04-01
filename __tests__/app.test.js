const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Fact = require('../lib/models/Fact');
// const cors = require('../lib/app');

describe('express-crud-be routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  beforeEach(async () => {
    await Fact.insert({ content: 'nougat is good', validity: true });
    await Fact.insert({ content: 'nougat is bad', validity: false });
  });

  // it('creates a new fact and sends an email', () => {
  //   return request(app)
  //     .post('/api/v1/facts')
  //     .send({ quantity: 10 })
  //     .then((res) => {
  //       expect(res.body).toEqual({ '': '' });
  //     });
  // });

  it('gets all facts in the database', () => {
    return request(app)
      .get('/api/v1/facts')
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: 3,
            content: 'hello',
            validity: true,
            contributor_id: 1,
          },
          {
            id: 5,
            content: 'nougat is good',
            validity: true,
            contributor_id: 1,
          },
          {
            id: 6,
            content: 'nougat is bad',
            validity: false,
            contributor_id: 1,
          },
        ]);
      });
  });
});
