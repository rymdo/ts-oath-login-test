const configDevelopment = require('./webpack.dev.config');

module.exports = {
  ...configDevelopment,
  mode: 'production'
};
