'use strict';

module.exports = {
    type: 'content-api',
    routes: [
        {
            method: 'GET',
            path: '/class',
            handler: 'classController.find',
        },
        {
            method: 'GET',
            path: '/class/:id',
            handler: 'classController.findOne',
        },
        {
            method: 'POST',
            path: '/class',
            handler: 'classController.create',
        },
        {
            method: 'DELETE',
            path: '/class/:id',
            handler: 'classController.delete',
        },

        // session routes
        {
            method: 'GET',
            path: '/session',
            handler: 'sessionController.find',
        },
        {
            method: 'GET',
            path: '/session/:id',
            handler: 'sessionController.findOne',
        },
        {
            method: 'POST',
            path: '/session',
            handler: 'sessionController.create',
        },
        {
            method: 'DELETE',
            path: '/session/:id',
            handler: 'sessionController.delete',
        },
        // bbb action routes

        {
            method: "POST",
            path: "/class/bbb/start/:classId",
            handler: "bbbController.startBBB",
        },
        {
            method: "POST",
            path: "/class/bbb/join",
            handler: "bbbController.joinBBB",
        },
        {
            method: "GET",
            path: "/class/bbb/status/:meetingId",
            handler: "bbbController.isMeetingRunning",
        },

    ],
};
