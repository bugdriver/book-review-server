module.exports = {
  books: `create table books(id SERIAL primary key,title varchar(255),writer varchar(255),front_image varchar(255),addedby varchar(100));`,
  reviews: `CREATE TABLE reviews(
    review_id SERIAL primary key,
    username varchar(255),
    book_id int,
    review_text varchar,
    review_date timeStamp default CURRENT_TIMESTAMP,
    CONSTRAINT fk_review_book_id
       FOREIGN KEY(book_id)
           REFERENCES books(id)
 );`
};
