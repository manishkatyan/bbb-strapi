"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  // creating meeting in bigbluebutton

  startBBB: async (ctx) => {
    let meetingParams;
    const { moderatorName } = ctx.request.body;
    const { uid } = ctx.params;

    const response = await strapi
      .query("plugin::bigbluebutton.class")
      .findOne({ where: { uid }, populate: true });

    if (response.id) {
      meetingParams = {
        name: response.className,
        meetingID: response.uid,
        moderatorPW: response.moderatorAccessCode
          ? response.moderatorAccessCode
          : "mp",
        attendeePW: response.viewerAccessCode
          ? response.viewerAccessCode
          : "ap",
        duration: 0,
        record: false,
        meetingKeepEvents: true,
        "meta_bbb-origin": "bbb-strapi",
      };

      if (response.bbbSettings.moderatorApproval) {
        meetingParams.guest = true;
        meetingParams.guestPolicy = "ASK_MODERATOR";
      }

      if (response.bbbSettings.muteOnStart) {
        meetingParams.muteOnStart = JSON.parse(
          response.bbbSettings.muteOnStart
        );
      }

      if (response.bbbSettings.logo) {
        meetingParams.logo = response.bbbSettings.logo;
      }

      if (response.bbbSettings.maxParticipants) {
        meetingParams.maxParticipants = JSON.parse(
          response.bbbSettings.maxParticipants
        );
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
      .plugin("bigbluebutton")
      .service("bbbService")
      .create(uid, meetingParams);

    if (createMeetingResponse.returncode === "SUCCESS") {
      const joinMeetingParams = {
        fullName: moderatorName ? moderatorName : "Moderator",
        meetingID: createMeetingResponse.meetingID,
        password: createMeetingResponse.moderatorPW
          ? createMeetingResponse.moderatorPW
          : "mp",
        "userdata-bbb_skip_check_audio": JSON.parse(
          response.bbbSettings["userdata-bbb_skip_check_audio"]
        ),
        "userdata-bbb_listen_only_mode": JSON.parse(
          response.bbbSettings["userdata-bbb_listen_only_mode"]
        ),
      };
      const joinMeetingURLResponse = await strapi
        .plugin("bigbluebutton")
        .service("bbbService")
        .join(uid, joinMeetingParams);

      ctx.send({ joinURL: joinMeetingURLResponse }, 200);
    }
  },

  // join  meeting in bigbluebutton

  joinBBB: async (ctx) => {
    const { viewerName } = ctx.request.body;
    const { uid } = ctx.params;
    let meetingParams;
    const response = await strapi
      .query("plugin::bigbluebutton.class")
      .findOne({ where: { uid }, populate: true });

    if (response.id) {
      meetingParams = {
        fullName: viewerName ? viewerName : "Viewer",
        meetingID: response.uid,
        password: response.viewerAccessCode ? response.viewerAccessCode : "ap",
        "userdata-bbb_skip_check_audio": JSON.parse(
          response.bbbSettings["userdata-bbb_skip_check_audio"]
        ),
        "userdata-bbb_listen_only_mode": JSON.parse(
          response.bbbSettings["userdata-bbb_listen_only_mode"]
        ),
        guest: response.bbbSettings.moderatorApproval ? true : false,
      };
    }

    const joinMeetingURL = await strapi
      .plugin("bigbluebutton")
      .service("bbbService")
      .join(uid, meetingParams);

    ctx.send({ joinURL: joinMeetingURL }, 200);
  },
};