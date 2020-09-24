const axios = require('axios');
const uuid = require('uuid').v4;
const { getGithubUser } = require('./authUtils');
const { getClientId, getClientSecret, getReactHost } = require('../config');

const signIn = (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${getClientId()}`
  );
};

const confirm = (req, res) => {
  const { code } = req.query;
  axios({
    url: `https://github.com/login/oauth/access_token`,
    method: 'post',
    data: { client_id: getClientId(), client_secret: getClientSecret(), code },
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
  })
    .then((response) => {
      const accessToken = response.data.access_token;
      const sId = uuid();
      const { sessions } = req.app.locals;
      sessions[sId] = accessToken;
      res.cookie('sId', sId);
      res.redirect(getReactHost());
    })
    .catch((err) => {
      res.redirect(getReactHost());
    });
};

const authorizeUser = (req, res, next) => {
  const { sessions } = req.app.locals;
  const accessToken = sessions[req.cookies.sId];
  if (!accessToken) {
    res.status(403);
    res.json({ message: 'unauthorized user' });
    return;
  }
  getGithubUser(accessToken).then((response) => {
    req.user = response.data;
    next();
  });
};

const getUser = (req, res) => {
  res.json(req.user);
};

const getBooks = (req, res) => {
  const { dataHandler } = req.app.locals;
  dataHandler.getBooks().then((books) => {
    res.json(books);
  });
};

const getBook = (req, res) => {
  const { bookId } = req.query;
  const { dataHandler } = req.app.locals;
  dataHandler.getBook(bookId).then((books) => {
    res.json(books);
  });
};

const getReviewOfBook = (req, res) => {
  const { bookId } = req.query;
  const { dataHandler } = req.app.locals;
  dataHandler.getReviewOfBook(bookId).then((reviews) => {
    res.json(reviews);
  });
};

const addReview = (req, res) => {
  const review = req.body;
  const { dataHandler } = req.app.locals;
  dataHandler.addReview({ ...review, username: req.user.login }).then((id) => {
    res.json({ lastId: id });
  });
};

const updateReview = (req, res) => {
  const { reviewId, reviewText } = req.body;
  const { dataHandler } = req.app.locals;
  dataHandler.updateReview(reviewId, reviewText).then((id) => {
    res.json({ lastId: id });
  });
};

const deleteReview = (req, res) => {
  const { reviewId } = req.body;
  const { dataHandler } = req.app.locals;
  dataHandler.deleteReview(reviewId).then((id) => {
    res.json({ lastId: id });
  });
};

const logout = (req, res) => {
  const { sessions } = req.app.locals;
  const { sId } = req.cookies;
  sessions[sId] = '';
  res.cookie('sId', '');
  res.redirect('/');
};

module.exports = {
  authorizeUser,
  confirm,
  getUser,
  logout,
  signIn,
  getBooks,
  getBook,
  getReviewOfBook,
  addReview,
  deleteReview,
  updateReview
};
