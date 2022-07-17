'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async startBBB(ctx) {
    let meetingParams;
    const { moderatorName } = ctx.request.body;
    const { meetingId } = ctx.params;

    const response = await strapi
      .query('plugin::bigbluebutton.class')
      .findOne({ where: { meetingId }, populate: true });

    if (response.id) {
      meetingParams = {
        name: response.className,
        meetingID: response.meetingId,
        moderatorPW: response.moderatorAccessCode ? response.moderatorAccessCode : 'mp',
        attendeePW: response.viewerAccessCode ? response.viewerAccessCode : 'ap',
        duration: 0,
        record: false,
        meetingKeepEvents: true,
        'meta_bbb-origin': 'bbb-strapi',
      };

      if (response.bbbSettings.moderatorApproval) {
        meetingParams.guest = true;
        meetingParams.guestPolicy = 'ASK_MODERATOR';
      }

      if (response.bbbSettings.muteOnStart) {
        meetingParams.muteOnStart = JSON.parse(response.bbbSettings.muteOnStart);
      }

      if (response.bbbSettings.logo) {
        meetingParams.logo = response.bbbSettings.logo;
      }

      if (response.bbbSettings.maxParticipants) {
        meetingParams.maxParticipants = JSON.parse(response.bbbSettings.maxParticipants);
      }

      if (response.bbbSettings.logoutURL) {
        meetingParams.logoutURL = response.bbbSettings.logoutURL;
      }

      if (response.bbbSettings.allowModsToUnmuteUsers) {
        meetingParams.allowModsToUnmuteUsers = JSON.parse(
          response.bbbSettings.allowModsToUnmuteUsers
        );
      }

      if (response.bbbSettings.lockSettingsDisablePrivateChat) {
        meetingParams.lockSettingsDisablePrivateChat = JSON.parse(
          response.bbbSettings.lockSettingsDisablePrivateChat
        );
      }
    }

    const createMeetingResponse = await strapi
      .plugin('bigbluebutton')
      .service('bbbService')
      .create(meetingId, meetingParams);

    if (createMeetingResponse.returncode === 'SUCCESS') {
      const joinMeetingParams = {
        fullName: moderatorName ? moderatorName : 'Moderator',
        meetingID: createMeetingResponse.meetingID,
        password: createMeetingResponse.moderatorPW ? createMeetingResponse.moderatorPW : 'mp',
        'userdata-bbb_skip_check_audio': JSON.parse(
          response.bbbSettings['userdata-bbb_skip_check_audio']
        ),
        'userdata-bbb_listen_only_mode': JSON.parse(
          response.bbbSettings['userdata-bbb_listen_only_mode']
        ),
      };
      const joinMeetingURLResponse = await strapi
        .plugin('bigbluebutton')
        .service('bbbService')
        .join(response.meetingId, joinMeetingParams);

      ctx.send({ joinURL: joinMeetingURLResponse }, 200);
    }
  },
  async joinBBB(ctx) {
    const { viewerName } = ctx.request.body;
    const { meetingId } = ctx.params;
    let meetingParams;
    const response = await strapi
      .query('plugin::bigbluebutton.class')
      .findOne({ where: { meetingId }, populate: true });

    if (response.id) {
      meetingParams = {
        fullName: viewerName ? viewerName : 'Viewer',
        meetingID: response.meetingId,
        password: response.viewerAccessCode ? response.viewerAccessCode : 'ap',
        'userdata-bbb_skip_check_audio': JSON.parse(
          response.bbbSettings['userdata-bbb_skip_check_audio']
        ),
        'userdata-bbb_listen_only_mode': JSON.parse(
          response.bbbSettings['userdata-bbb_listen_only_mode']
        ),
        guest: response.bbbSettings.moderatorApproval ? true : false,
      };
    }

    const joinMeetingURL = await strapi
      .plugin('bigbluebutton')
      .service('bbbService')
      .join(response.meetingId, meetingParams);

    ctx.send({ joinURL: joinMeetingURL }, 200);
  },

  async validateJoin(ctx) {
    const { meetingId } = ctx.params;
    const meetingParams = ctx.request.body;
    const classdata = await strapi.query('plugin::bigbluebutton.class').findOne({
      where: { meetingId },
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

  async isMeetingRunning(ctx) {
    const { meetingId } = ctx.params;
    const status = await strapi
      .plugin('bigbluebutton')
      .service('bbbService')
      .isMeetingRunning(meetingId);

    ctx.send({ running: status }, 200);
  },

  async endMeeting(ctx) {
    const { meetingId, meetingPassword } = ctx.request.body;

    const endMeetingResponse = await strapi
      .plugin('bigbluebutton')
      .service('bbbService')
      .end(meetingId, meetingPassword);
    ctx.send(endMeetingResponse, 200);
  },

  async checkBigBlueButtonUrlAndSecret(ctx) {
    const { url, secret } = ctx.request.body;

    const checkUrlResponse = await strapi
      .plugin('bigbluebutton')
      .service('bbbService')
      .checkUrlAndSecret(url, secret);
    ctx.send(checkUrlResponse, 200);
  },

  async updateSetting(ctx) {
    const { url, secret } = ctx.request.body;

    const setUrlAndSecret = await strapi
      .plugin('bigbluebutton')
      .service('bbbService')
      .setUrlAndScret(url, secret);
    ctx.send(setUrlAndSecret, 200);
  },
  async getSetting(ctx) {
    const pluginStore = strapi.store({ type: 'plugin', name: 'bigbluebutton' });

    const url = await pluginStore.get({ key: 'url' });
    const secret = await pluginStore.get({ key: 'secret' });

    return ctx.send({ ok: true, url, secret });
  },
};
