/* eslint-disable node/no-missing-require */

'use strict';
const path = require('path');
const koaStatic = require('koa-static');

module.exports = async ({ strapi }) => {
  strapi.server.routes([
    {
      method: 'GET',
      path: '/plugins/bigbluebutton/static/(.*)',
      async handler(ctx, next) {
        ctx.url = path.basename(`${ctx.url}/bbb.js`);
        const staticFolder = path.resolve(strapi.dirs.extensions, 'bigbluebutton', 'public');
        return koaStatic(staticFolder)(ctx, next);
      },
      config: {
        auth: false,
      },
    },
  ]);
};
