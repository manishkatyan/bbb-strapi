'use strict';
const axios = require("axios");
const querystring = require("querystring");
const crypto = require("hash.js");
const { XMLParser } = require("fast-xml-parser");
const jwt = require("jsonwebtoken");
const parser = new XMLParser();


const bbb = {
  host: process.env.BBB_URL,
  salt: process.env.SECRET
};

module.exports = ({ strapi }) => ({
  async create(classUID, params) {
    const meetingParams = params;
    const url = constructUrl(bbb, "create", meetingParams);
    try {
      const bbbClass = await strapi.query('plugin::bigbluebutton.class').findOne({ uid: classUID })
      const response = await axios.get(url);
      const parsedResponse = parseXml(response.data);
      if (parsedResponse.returncode === 'SUCCESS' && parsedResponse.internalMeetingID) {
        await strapi.query('plugin::bigbluebutton.session').create({ data: { bbbRecordId: parsedResponse.internalMeetingID, isRecorded: meetingParams.record, isRecoringAvailable: false, class: bbbClass.id } })
      }
      return parsedResponse;
    } catch (error) {
      console.log(error);
      return { returncode: "FAILED" };
    }
  },
  async join(params) {
    const joinMeetingParams = params;
    const joinURL = constructUrl(bbb, "join", joinMeetingParams);
    return joinURL;
  },
  async isMeetingRunning(meetingID) {
    const params = {
      meetingID: meetingID,
    };
    try {
      const url = constructUrl(bbb, "isMeetingRunning", params);
      const response = await axios.get(url);
      return parseXml(response.data).running;
    } catch (error) {
      console.log(error);
      return { returncode: "FAILED" };
    }
  },
  async end(meetingID, password) {
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
  // updateRecodingStatus: async (token) => {
  //   const decodedToken = jwt.verify(token, bbb.salt);
  //   const bbbMeetingId = decodedToken.record_id;
  //   try {
  //     await strapi
  //       .query("plugin::bigbluebutton.session")
  //       .update({ recordingId: bbbMeetingId }, { isRecordingAvailable: true });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
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
