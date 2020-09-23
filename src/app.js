const express = require('express');
const { Pool } = require('pg');
const cookieParser = require('cookie-parser');
const handler = require('./handler');
const DataHandler = require('../db/dataHandler');
const { getPgConnectionString } = require('../config');

const app = express();
const dbClient = new Pool({
  connectionString: getPgConnectionString()
});
app.locals.dataHandler = new DataHandler(dbClient);
app.locals.sessions = {};
app.use(express.static('images'));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.get('/api/signin', handler.signIn);
app.get('/confirm', handler.confirm);
app.get('/api/getReviewOfBook', handler.getReviewOfBook);
app.get('/api/getBooks', handler.getBooks);
app.get('/api/getBook', handler.getBook);
app.use(handler.authorizeUser);
app.get('/api/getUser', handler.getUser);
app.post('/api/addReview', handler.addReview);
app.post('/api/deleteReview', handler.deleteReview);
app.post('/api/updateReview', handler.updateReview);
app.post('/api/logout', handler.logout);

module.exports = app;
