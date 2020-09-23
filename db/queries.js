module.exports = {
  getBooks: `select id,title,writer,front_image as frontimage from books`,
  getBook: `select id,title,writer,front_image as frontimage from books where id=$1`,
  getReviewOfBook: `select review_id as reviewId,
                      username,book_id as bookId,
                      review_text as reviewText,
                      review_date as reviewDate
                       from reviews where book_id=$1`,
  addReview: `insert into reviews(username,book_id,review_text) values($1,$2,$3)`,
  deleteReview: 'delete from reviews where review_id=$1',
  updateReview: 'update reviews set review_text=$1 where review_id=$2'
};
