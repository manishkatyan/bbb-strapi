'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('bigbluebutton')
      .service('myService')
      .getWelcomeMessage();
  },
};
