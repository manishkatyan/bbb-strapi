'use strict';
const classSchema = require('./class');
const sessionSchema = require('./session');

module.exports = {
  class: { schema: classSchema }, // should re-use the singularName of the content-type
  session: { schema: sessionSchema },
};
