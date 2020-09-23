const { env } = process;

const getClientId = () => {
  return env.CLIENT_ID;
};

const getClientSecret = () => {
  return env.CLIENT_SECRET;
};

const getReactHost = () => {
  return env.REACT_HOST;
};

const getPgConnectionString = () => {
  return env.DATABASE_URL;
};

module.exports = {
  getClientId,
  getClientSecret,
  getReactHost,
  getPgConnectionString
};
