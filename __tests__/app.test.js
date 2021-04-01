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
    await Fact.insert({
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

  it('creates a new fact', () => {
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

  it('deletes a fact by id', () => {
    return request(app)
      .delete(`/api/v1/facts/${fact.id}`)
      .then((res) => {
        console.log(res.body);
        expect(res.body).toEqual(fact);
      });
  });
});
