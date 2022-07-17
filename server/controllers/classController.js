/* eslint-disable node/no-missing-require */
/* eslint-disable node/no-extraneous-require */

'use strict';
const path = require('path');
const fs = require('fs-extra');
const crypto = require('hash.js');
const koaStatic = require('koa-static');
const _ = require('lodash');

module.exports = ({ strapi }) => ({
  async find(ctx) {
    const res = await strapi.query('plugin::bigbluebutton.class').findMany({ populate: true });
    ctx.body = res;
  },
  async findOne(ctx) {
    const { meetingId } = ctx.params;
    const res = await strapi
      .query('plugin::bigbluebutton.class')
      .findOne({ where: { meetingId }, populate: true });
    ctx.body = res;
  },

  async invite(ctx, next) {
    const { meetingId } = ctx.params;
    const classdata = await strapi.query('plugin::bigbluebutton.class').findOne({
      where: { meetingId },
    });

    const layout = fs.readFileSync(path.resolve(__dirname, '..', 'public', 'index.html'), 'utf8');

    const filledLayout = _.template(layout)({
      meetingId,
      className: classdata.className,
      backendUrl: strapi.config.server.url,
    });

    const layoutPath = path.resolve(
      strapi.dirs.extensions,
      'bigbluebutton',
      'public',
      'index.html'
    );
    await fs.ensureFile(layoutPath);
    await fs.writeFile(layoutPath, filledLayout);

    ctx.url = path.basename(`${ctx.url}/index.html`);
    const staticFolder = path.resolve(strapi.dirs.extensions, 'bigbluebutton', 'public');
    return koaStatic(staticFolder)(ctx, next);
  },

  async update(ctx) {
    const { id } = ctx.params;
    const res = await strapi
      .query('plugin::bigbluebutton.class')
      .findone({ id }, { data: ctx.request.body, populate: true });
    ctx.body = res;
  },
  async create(ctx) {
    const { className, moderatorAccessCode, viewerAccessCode, bbbSettings, meetingId } =
      ctx.request.body;
    const params = {
      className: className ? className : 'Demo Class',
      moderatorAccessCode: moderatorAccessCode ? moderatorAccessCode : 'mp',
      viewerAccessCode: viewerAccessCode ? viewerAccessCode : 'ap',
      bbbSettings:
        bbbSettings && bbbSettings.length > 1
          ? bbbSettings
          : {
              moderatorApproval: false,
              maxParticipants: 100,
              logoutURL: 'https://higheredlab.com/',
              allowModsToUnmuteUsers: false,
              lockSettingsDisablePrivateChat: false,
              logo: 'https://higheredlab.com/wp-content/uploads/hel.png',
              muteOnStart: false,
              'userdata-bbb_skip_check_audio': 'false',
              'userdata-bbb_listen_only_mode': 'true',
            },
      meetingId: meetingId
        ? meetingId
        : crypto
            .sha256()
            .update(`${className}${Date.now() / 1000}`)
            .digest('hex')
            .slice(1, 13),
    };

    const res = await strapi
      .query('plugin::bigbluebutton.class')
      .create({ data: params, populate: true });
    ctx.body = res;
  },
  async delete(ctx) {
    const { id } = ctx.params;
    const sessions = await strapi
      .query('plugin::bigbluebutton.session')
      .findMany({ where: { class: { id } } });
    sessions.forEach(async session => {
      await strapi.query('plugin::bigbluebutton.session').delete({ where: { id: session.id } });
    });
    await strapi.query('plugin::bigbluebutton.class').delete({ where: { id } });
    ctx.body = { message: 'succuss' };
  },
});
