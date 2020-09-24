const { assert } = require('chai');
const { fake, stub, mock } = require('sinon');

const DataHandler = require('../db/dataHandler');

describe('DataHandler', function() {
  let dataHandler;
  let dbClient;
  beforeEach(() => {
    dbClient = {};
    dataHandler = new DataHandler(dbClient);
  });

  context('query', function() {
    it('should run query with params and give result back', function(done) {
      dbClient['query'] = fake.yields(null, {
        rows: ['data']
      });

      dataHandler.query('some query', ['data']).then((user) => {
        assert.deepStrictEqual(user, ['data']);
        assert.ok(dbClient.query.calledOnce);
        assert.deepStrictEqual(dbClient.query.args[0][1], ['data']);
        done();
      });
    });
  });
});
