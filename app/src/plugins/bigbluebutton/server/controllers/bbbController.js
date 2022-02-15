'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    startBBB: async (ctx) => {
        const meetingParams = ctx.request.body
        const classId = ctx.params.classId
        const createMeetingResponse = await strapi.plugin('bigbluebutton').service('bbbService').create(classId, meetingParams);
        return (createMeetingResponse)
    },

    joinBBB: async (ctx) => {
        const meetingParams = ctx.request.body
        const joinMeetingURL = await strapi.plugin('bigbluebutton').service('bbbService').join(meetingParams);
        return ({ joinURL: joinMeetingURL })
    },

    isMeetingRunning: async (ctx) => {
        const meetingID = ctx.params.meetingID
        const status = await strapi.plugin('bigbluebutton').service('bbbService').isMeetingRunning(meetingID);
        return ({ running: status })
    },

    // updateRecordingStatus: async (ctx) => {
    //     await strapi.services.bigbluebutton.updateRecodingStatus(ctx.request.body.signed_parameters)
    //     ctx.send({ message: 'Success' }, 200);
    // }

};