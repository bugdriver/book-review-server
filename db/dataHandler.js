const queries = require('./queries');

class DataHandler {
  constructor(dbClient) {
    this.dbClient = dbClient;
  }

  getBooks() {
    return new Promise((resolve, reject) => {
      this.dbClient.query(queries.getBooks, (err, res) => {
        if (err) {
          reject(err);
        }
        console.log(res);
        resolve(res.rows);
      });
    });
  }
}

module.exports = DataHandler;
