// you can require your configuration data whenever you need it using
// the get function of our module and passing the environment variable:
// const config = require('./config.js').get(process.env.NODE_ENV);

const config = {
  production: {
    backendUrl: 'https://wevedo.herokuapp.com',
  },

  default: {
    backendUrl: 'https://wevedo-prod.herokuapp.com',
  },
};

exports.get = function get(env) {
  return config[env] || config.default;
};
