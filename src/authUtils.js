const axios = require('axios');

const getGithubUser = (accessToken) => {
  return axios('https://api.github.com/user', {
    headers: {
      Authorization: `token ${accessToken}`
    }
  });
};

module.exports = { getGithubUser };
