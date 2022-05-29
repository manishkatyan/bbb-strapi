"use strict";

module.exports = [
  {
    method: "GET",
    path: "/class",
    handler: "classController.find",
    config: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/class/:uid",
    handler: "classController.findOne",
    config: {
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/class",
    handler: "classController.create",
    config: {
      auth: false,
    },
  },
  {
    method: "PUT",
    path: "/class/:id",
    handler: "classController.update",
    config: {
      auth: false,
    },
  },
  {
    method: "DELETE",
    path: "/class/:id",
    handler: "classController.delete",
    config: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/session",
    handler: "sessionController.find",
    config: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/session/:id",
    handler: "sessionController.findOne",
    config: {
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/session",
    handler: "sessionController.create",
    config: {
      auth: false,
    },
  },
  {
    method: "DELETE",
    path: "/session/:id",
    handler: "sessionController.delete",
    config: {
      auth: false,
    },
  },
  // bbb action routes

  {
    method: "POST",
    path: "/class/start/:uid",
    handler: "bbbController.startBBB",
    config: {
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/class/auth/join/:uid",
    handler: "bbbController.validateJoin",
    config: {
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/class/join/:uid",
    handler: "bbbController.joinBBB",
    config: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/class/join/:uid",
    handler: "classController.invite",
    config: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/class/status/:uid",
    handler: "bbbController.isMeetingRunning",
    config: {
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/class/end",
    handler: "bbbController.endMeeting",
    config: {
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/verifyUrlAndSecret",
    handler: "bbbController.checkBigBlueButtonUrlAndSecret",
    config: {
      auth: false,
    },
  },
  {
    method: "PUT",
    path: "/updateSettings",
    handler: "bbbController.updateSetting",
    config: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/getSettings",
    handler: "bbbController.getSetting",
    config: {
      auth: false,
    },
  },
];
