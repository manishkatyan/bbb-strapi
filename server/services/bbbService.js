/* eslint-disable node/no-unsupported-features/node-builtins */
'use strict';

const axios = require('axios');
const crypto = require('hash.js');
const { XMLParser } = require('fast-xml-parser');

const parser = new XMLParser();

module.exports = ({ strapi }) => ({
  async create(classUID, params) {
    const meetingParams = params;
    const pluginStore = strapi.store({
      type: 'plugin',
      name: 'bigbluebutton',
    });

    const host = await pluginStore.get({ key: 'url' });
    const salt = await pluginStore.get({ key: 'secret' });

    const bbb = {
      host,
      salt,
    };
    const url = constructUrl(bbb, 'create', meetingParams);

    try {
      const bbbClass = await strapi
        .query('plugin::bigbluebutton.class')
        .findOne({ where: { uid: classUID } });

      const response = await axios.get(url);
      const parsedResponse = parseXml(response.data);

      if (parsedResponse.returncode === 'SUCCESS' && parsedResponse.internalMeetingID) {
        await strapi.query('plugin::bigbluebutton.session').create({
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
      return { returncode: 'FAILED' };
    }
  },
  async join(meetingId, params) {
    const joinMeetingParams = params;
    const pluginStore = strapi.store({
      type: 'plugin',
      name: 'bigbluebutton',
    });

    const host = await pluginStore.get({ key: 'url' });
    const salt = await pluginStore.get({ key: 'secret' });
    const bbb = {
      host,
      salt,
    };
    joinMeetingParams.meetingID = meetingId;
    const joinURL = constructUrl(bbb, 'join', joinMeetingParams);
    return joinURL;
  },
  async isMeetingRunning(meetingId) {
    try {
      const pluginStore = strapi.store({
        type: 'plugin',
        name: 'bigbluebutton',
      });

      const host = await pluginStore.get({ key: 'url' });
      const salt = await pluginStore.get({ key: 'secret' });
      const bbb = {
        host,
        salt,
      };
      const params = {
        meetingID: meetingId,
      };
      const url = constructUrl(bbb, 'isMeetingRunning', params);
      const response = await axios.get(url);
      return parseXml(response.data).running;
    } catch (error) {
      return { returncode: 'FAILED' };
    }
  },
  async end(meetingID, password) {
    const pluginStore = strapi.store({
      type: 'plugin',
      name: 'bigbluebutton',
    });

    const host = await pluginStore.get({ key: 'url' });
    const salt = await pluginStore.get({ key: 'secret' });
    const bbb = {
      host,
      salt,
    };
    const url = constructUrl(bbb, 'end', { meetingID, password });
    try {
      const response = await axios.get(url);
      const parsedResponse = parseXml(response.data);
      return parsedResponse;
    } catch (error) {
      return { returncode: 'FAILED' };
    }
  },

  async checkUrlAndSecret(url, secret) {
    const bbbParams = {
      host: url,
      salt: secret,
    };
    const meetingParams = {
      name: 'test',
      meetingID: 'test01',
    };

    const bbbUrl = constructUrl(bbbParams, 'create', meetingParams);

    function getChecksum(callName, queryParams, sharedSecret) {
      const paramStringify = new URLSearchParams(queryParams).toString();
      return crypto['sha1']().update(`${callName}${paramStringify}${sharedSecret}`).digest('hex');
    }

    function constructUrl(bbb, action, params) {
      params.checksum = getChecksum(action, params, bbb.salt);
      const paramStringify = new URLSearchParams(params).toString();
      return `${bbb.host}/api/${action}?${paramStringify}`;
    }

    const endMeeting = async (meetingID, password) => {
      const url = constructUrl(bbbParams, 'end', { meetingID, password });
      await axios.get(url);
    };

    try {
      const response = await axios.get(bbbUrl);
      const parsedResponse = parseXml(response.data);
      if (parsedResponse.returncode === 'SUCCESS') {
        await endMeeting(parsedResponse.meetingID, parsedResponse.moderatorPW);
      }
      return parsedResponse;
    } catch (error) {
      return { returncode: 'FAILED' };
    }
  },
  async setUrlAndScret(url, secret) {
    const pluginStore = strapi.store({ type: 'plugin', name: 'bigbluebutton' });
    try {
      const res2 = await pluginStore.set({ key: 'url', value: url });
      const res3 = await pluginStore.set({ key: 'secret', value: secret });
      const urlResponse = await pluginStore.get({ key: 'url' });

      return { ok: true, urlResponse, res2, res3 };
    } catch (error) {
      return { returncode: 'FAILED' };
    }
  },
});

function getChecksum(callName, queryParams, sharedSecret) {
  const paramStringify = new URLSearchParams(queryParams).toString();
  return crypto['sha1']().update(`${callName}${paramStringify}${sharedSecret}`).digest('hex');
}

function constructUrl(bbb, action, params) {
  params.checksum = getChecksum(action, params, bbb.salt);
  const paramStringify = new URLSearchParams(params).toString();
  return `${bbb.host}/api/${action}?${paramStringify}`;
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
