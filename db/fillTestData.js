const { exec } = require('child_process');
const { getPgConnectionString } = require('../config');

const fillTestData = () => {
  exec(
    `psql ${getPgConnectionString()} -f db/fillTestData.sql`,
    (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    }
  );
};

module.exports = { fillTestData };
