const request = require('supertest');
const app = require('../src/app');
const { mock, replace, restore } = require('sinon');
const { fillTestData } = require('../db/fillTestData');

describe('handlers', function() {
  before(() => {
    fillTestData(app.locals.dataHandler);
  });
  context('/api/getBooks', function() {
    it('getBooks from api', function(done) {
      request(app)
        .get('/api/getBooks')
        .expect([
          {
            id: 1,
            title: 'first title',
            writer: 'first writer',
            frontimage: 'first image'
          },
          {
            id: 2,
            title: 'second title',
            writer: 'second writer',
            frontimage: 'second image'
          },
          {
            id: 3,
            title: 'third title',
            writer: 'third writer',
            frontimage: 'third image'
          },
          {
            id: 4,
            title: 'fourth title',
            writer: 'fourth writer',
            frontimage: 'fourth image'
          }
        ])
        .expect(200, done);
    });
  });
});
