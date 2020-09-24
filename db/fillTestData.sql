\c bookreviewtest

drop table reviews;
drop table books;

create table books(id SERIAL primary key,title varchar(255),writer varchar(255),front_image varchar(255),addedby varchar(100));

CREATE TABLE reviews(
    review_id SERIAL primary key,
    username varchar(255),
    book_id int,
    review_text varchar,
    review_date timeStamp default CURRENT_TIMESTAMP,
    CONSTRAINT fk_review_book_id
       FOREIGN KEY(book_id)
           REFERENCES books(id)
 );

insert into books(title,writer,front_image,addedby) values
      ('first title', 'first writer', 'first image', 'ram'),
      ('second title', 'second writer', 'second image', 'ram'),
      ('third title', 'third writer', 'third image', 'ram'),
      ('fourth title', 'fourth writer', 'fourth image', 'ram');

insert into reviews(username,book_id,review_text) VALUES
      ('ram', 1, 'first review'),
      ('sam', 2, 'second review'),
      ('dan', 1, 'third review'),
      ('don', 3, 'fouth review');
  