"use strict";

const axios = require("axios");
const querystring = require("querystring");
const crypto = require("hash.js");
const { XMLParser } = require("fast-xml-parser");
const jwt = require("jsonwebtoken");
const parser = new XMLParser();

module.exports = ({ strapi }) => ({
  async create(classUID, params) {
    const meetingParams = params;
    const pluginStore = strapi.store({
      type: "plugin",
      name: "bigbluebutton",
    });

    const host = await pluginStore.get({ key: "url" });
    const salt = await pluginStore.get({ key: "secret" });
    const bbb = {
      host,
      salt,
    };
    const url = constructUrl(bbb, "create", meetingParams);

    try {
      const bbbClass = await strapi
        .query("plugin::bigbluebutton.class")
        .findOne({ where: { uid: classUID } });

      const response = await axios.get(url);
      const parsedResponse = parseXml(response.data);

      if (
        parsedResponse.returncode === "SUCCESS" &&
        parsedResponse.internalMeetingID
      ) {
        await strapi.query("plugin::bigbluebutton.session").create({
          data: {
            bbbRecordId: parsedResponse.internalMeetingID,
            isRecorded: meetingParams.record,
            isRecoringAvailable: false,
            class: bbbClass.id,
          },
        });
      }
      return parsedResponse;
    } catch (error) {
      console.log(error);
      return { returncode: "FAILED" };
    }
  },
  async join(uid, params) {
    const joinMeetingParams = params;
    const pluginStore = strapi.store({
      type: "plugin",
      name: "bigbluebutton",
    });

    const host = await pluginStore.get({ key: "url" });
    const salt = await pluginStore.get({ key: "secret" });
    const bbb = {
      host,
      salt,
    };
    // const bbbClass = await strapi
    //   .query("plugin::bigbluebutton.class")
    //   .findOne({ where: { uid } });
    joinMeetingParams.meetingID = uid;
    const joinURL = constructUrl(bbb, "join", joinMeetingParams);
    console.log("join ", joinURL);
    return joinURL;
  },
  async isMeetingRunning(uid) {
    try {
      const pluginStore = strapi.store({
        type: "plugin",
        name: "bigbluebutton",
      });

      const host = await pluginStore.get({ key: "url" });
      const salt = await pluginStore.get({ key: "secret" });
      const bbb = {
        host,
        salt,
      };
      // const bbbClass = await strapi
      //   .query("plugin::bigbluebutton.class")
      //   .findOne({ where: { uid } });
      const params = {
        meetingID: uid,
      };
      const url = constructUrl(bbb, "isMeetingRunning", params);
      const response = await axios.get(url);
      console.log("is meeting Running", response);
      return parseXml(response.data).running;
    } catch (error) {
      console.log(error);
      return { returncode: "FAILED" };
    }
  },
  async end(meetingID, password) {
    const pluginStore = strapi.store({
      type: "plugin",
      name: "bigbluebutton",
    });

    const host = await pluginStore.get({ key: "url" });
    const salt = await pluginStore.get({ key: "secret" });
    const bbb = {
      host,
      salt,
    };
    const url = constructUrl(bbb, "end", { meetingID, password });
    try {
      const response = await axios.get(url);
      const parsedResponse = parseXml(response.data);
      return parsedResponse;
    } catch (error) {
      console.log(error);
      return { returncode: "FAILED" };
    }
  },

  async checkUrlAndSecret(url, secret) {
    const bbbParams = {
      host: url,
      salt: secret,
    };
    const meetingParams = {
      name: "test",
      meetingID: "test01",
    };

    const bbbUrl = constructUrl(bbbParams, "create", meetingParams);

    function getChecksum(callName, queryParams, sharedSecret) {
      return crypto["sha1"]()
        .update(`${callName}${querystring.encode(queryParams)}${sharedSecret}`)
        .digest("hex");
    }

    function constructUrl(bbb, action, params) {
      params.checksum = getChecksum(action, params, bbb.salt);
      return `${bbb.host}/api/${action}?${querystring.encode(params)}`;
    }

    try {
      const response = await axios.get(bbbUrl);
      const parsedResponse = parseXml(response.data);
      return parsedResponse;
    } catch (error) {
      console.log(error);
      return { returncode: "FAILED" };
    }
  },
});

function getChecksum(callName, queryParams, sharedSecret) {
  return crypto["sha1"]()
    .update(`${callName}${querystring.encode(queryParams)}${sharedSecret}`)
    .digest("hex");
}

function constructUrl(bbb, action, params) {
  params.checksum = getChecksum(action, params, bbb.salt);

  return `${bbb.host}/api/${action}?${querystring.encode(params)}`;
}

function parseXml(xml) {
  const json = parser.parse(xml).response;

  if (json.meetings) {
    let meetings = json.meetings ? json.meetings.meeting : [];
    meetings = Array.isArray(meetings) ? meetings : [meetings];
    json.meetings = meetings;
  }
  if (json.recordings) {
    let recordings = json.recordings ? json.recordings.recording : [];
    recordings = Array.isArray(recordings) ? recordings : [recordings];
    json.recordings = recordings;
  }
  return json;
}
