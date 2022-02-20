'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    startBBB: async (ctx) => {
        const meetingParams = ctx.request.body
        const { uid } = ctx.params

        const createMeetingResponse = await strapi.plugin('bigbluebutton').service('bbbService').create(uid, meetingParams);
        ctx.send(createMeetingResponse, 200)
    },
    joinBBB: async (ctx) => {
        const { uid } = ctx.params
        const meetingParams = ctx.request.body
        const joinMeetingURL = await strapi.plugin('bigbluebutton').service('bbbService').join(uid, meetingParams);
        ctx.send({ joinURL: joinMeetingURL }, 200)
        // ctx.redirect(joinMeetingURL)

    },

    isMeetingRunning: async (ctx) => {
        const { meetingId } = ctx.params
        console.log(meetingId)
        const status = await strapi.plugin('bigbluebutton').service('bbbService').isMeetingRunning(meetingId);
        ctx.send({ running: status }, 200)
    },

    endMeeting: async (ctx) => {
        const { meetingId, meetingPassword } = ctx.request.body
        const endMeetingResponse = await strapi.plugin('bigbluebutton').service('bbbService').end(meetingId, meetingPassword);
        ctx.send(endMeetingResponse, 200)
    },

    // updateRecordingStatus: async (ctx) => {
    //     await strapi.services.bigbluebutton.updateRecodingStatus(ctx.request.body.signed_parameters)
    //     ctx.send({ message: 'Success' }, 200);
    // }

};