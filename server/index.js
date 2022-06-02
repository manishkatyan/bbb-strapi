'use strict';

const contentTypes = require('./content-types');
const controllers = require('./controllers');
const routes = require('./routes');
const services = require('./services');
const register = require('./register');

module.exports = {
  contentTypes,
  routes,
  controllers,
  register,
  services,
};
