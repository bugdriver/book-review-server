const { exec } = require('child_process');

const fillTestData = () => {
  exec(
    'psql postgres -U rajdb -f db/fillTestData.sql',
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
