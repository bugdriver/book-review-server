const queries = require('./queries');

class DataHandler {
  constructor(dbClient) {
    this.dbClient = dbClient;
  }

  query(queryString, params) {
    return new Promise((resolve, reject) => {
      this.dbClient.query(queryString, params, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }

  getBooks() {
    return this.query(queries.getBooks);
  }

  getBook(bookId) {
    return this.query(queries.getBook, [bookId]).then((res) => res[0]);
  }

  getReviewOfBook(bookId) {
    return this.query(queries.getReviewOfBook, [bookId]);
  }

  addReview(review) {
    const { username, bookId, reviewText } = review;
    return this.query(queries.addReview, [username, bookId, reviewText]);
  }

  updateReview(reviewId, reviewText) {
    return this.query(queries.updateReview, [reviewText, reviewId]);
  }

  deleteReview(reviewId) {
    return this.query(queries.deleteReview, [reviewId]);
  }

  addBook(bookDetail) {
    const { title, writer, description, bookimage, addedby } = bookDetail;
    return this.query(queries.addBook, [
      title,
      writer,
      description,
      addedby,
      bookimage
    ]);
  }
}

module.exports = DataHandler;
