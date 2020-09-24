const { execSync } = require('child_process');
const { getPgConnectionString } = require('../config');

const fillTestData = () => {
  return new Promise((resolve, reject) => {
    execSync(`psql ${getPgConnectionString()} -f db/fillTestData.sql`);
  });
};

module.exports = { fillTestData };
