"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  startBBB: async (ctx) => {
    const meetingParams = ctx.request.body;
    const { uid } = ctx.params;
    const createMeetingResponse = await strapi
      .plugin("bigbluebutton")
      .service("bbbService")
      .create(uid, meetingParams);
    ctx.send(createMeetingResponse, 200);
  },
  joinBBB: async (ctx) => {
    const { uid } = ctx.params;
    const meetingParams = ctx.request.body;
    const joinMeetingURL = await strapi
      .plugin("bigbluebutton")
      .service("bbbService")
      .join(uid, meetingParams);

    ctx.send({ joinURL: joinMeetingURL }, 200);
    // ctx.redirect(joinMeetingURL)
  },
  validateJoin: async (ctx) => {
    const { uid } = ctx.params;
    const meetingParams = ctx.request.body;
    const classdata = await strapi
      .query("plugin::bigbluebutton.class")
      .findOne({
        where: { uid },
      });
    if (
      meetingParams.code == classdata.moderatorAccessCode ||
      meetingParams.code == classdata.viewerAccessCode
    ) {
      ctx.send({ isValid: true }, 200);
    } else {
      ctx.send({ isValid: false }, 200);
    }
  },

  isMeetingRunning: async (ctx) => {
    const { uid } = ctx.params;

    const status = await strapi
      .plugin("bigbluebutton")
      .service("bbbService")
      .isMeetingRunning(uid);

    ctx.send({ running: status }, 200);
  },

  endMeeting: async (ctx) => {
    const { meetingId, meetingPassword } = ctx.request.body;
    const endMeetingResponse = await strapi
      .plugin("bigbluebutton")
      .service("bbbService")
      .end(meetingId, meetingPassword);
    ctx.send(endMeetingResponse, 200);
  },

  checkBigBlueButtonUrlAndSecret: async (ctx) => {
    const { url, secret } = ctx.request.body;

    const checkUrlResponse = await strapi
      .plugin("bigbluebutton")
      .service("bbbService")
      .checkUrlAndSecret(url, secret);
    ctx.send(checkUrlResponse, 200);
  },

  updateSetting: async (ctx) => {
    const { url, secret } = ctx.request.body;

    const pluginStore = strapi.store({ type: "plugin", name: "bigbluebutton" });

    const res2 = await pluginStore.set({ key: "url", value: url });
    const res3 = await pluginStore.set({ key: "secret", value: secret });
    const res = await pluginStore.get({ key: "url" });

    return ctx.send({ ok: true, res, res2, res3 });
  },
  getSetting: async (ctx) => {
    const pluginStore = strapi.store({ type: "plugin", name: "bigbluebutton" });

    const url = await pluginStore.get({ key: "url" });
    const secret = await pluginStore.get({ key: "secret" });

    return ctx.send({ ok: true, url, secret });
  },
  // updateRecordingStatus: async (ctx) => {
  //     await strapi.services.bigbluebutton.updateRecodingStatus(ctx.request.body.signed_parameters)
  //     ctx.send({ message: 'Success' }, 200);
  // }
};
