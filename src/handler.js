const axios = require('axios');
const uuid = require('uuid');
const { getClientId, getClientSecret, getReactHost } = require('../config');

const signIn = (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${getClientId()}`
  );
};

const authorizeUser = (req, res) => {
  const { code } = req.query;
  axios({
    url: `https://github.com/login/oauth/access_token`,
    method: 'post',
    data: { client_id: getClientId(), client_secret: getClientSecret(), code },
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
  }).then((response) => {
    const accessToken = response.data.access_token;
    const sId = uuid();
    const { sessions } = req.app.locals;
    sessions[sId] = accessToken;
    res.cookie('sId', sId);
    res.redirect(getReactHost());
  });
};

const getUser = (req, res) => {
  const { sessions } = req.app.locals;
  const accesToken = sessions[req.cookies.sId];
  axios('https://api.github.com/user', {
    headers: {
      Authorization: `token ${accesToken}`
    }
  })
    .then((response) => {
      res.json(response.data);
    })
    .catch(() => {
      res.status(401);
      res.json({ message: 'bad request' });
    });
};

const getBooks = (req, res) => {
  console.log('hellow');
  const { dataHandler } = req.app.locals;
  dataHandler.getBooks().then((books) => {
    console.log(books);
    res.json(books);
  });
};

const logout = (req, res) => {
  const { sessions } = req.app.locals;
  const { sId } = req.cookies;
  sessions[sId] = '';
  res.cookie('sId', '');
  res.redirect('/');
};

module.exports = { authorizeUser, getUser, logout, signIn, getBooks };
