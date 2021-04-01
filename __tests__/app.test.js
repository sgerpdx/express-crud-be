const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const fakeRequest = require('supertest');
const app = require('../lib/app');
// const cors = require('../lib/app');

describe('express-crud-be routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('returns all facts', async () => {
    const expectation = [
      // {
      //   id: 1,
      //   content: 'Nougat is delicious',
      //   validity: true,
      //   contributor_id: 1,
      // },
      // {
      //   id: 2,
      //   content:
      //     'Nougat is made from sugar or honey and roasted nuts or egg whites',
      //   validity: true,
      //   contributor_id: 1,
      // },
      // {
      //   id: 3,
      //   content: 'Nougat roughly translates to Latin for nut-bread',
      //   validity: true,
      //   contributor_id: 1,
      // },
      {
        content: 'hello',
        contributor_id: 1,
        id: 3,
        validity: true,
      },
    ];

    const data = await fakeRequest(app)
      .get('/facts')
      .expect('Content-Type', /json/)
      .expect(200);
    console.log('what');
    expect(data.body).toEqual(expectation);
  });
});
