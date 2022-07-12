import instance from './axiosInstance';

const axios = instance;

export async function getClass() {
  const response = await axios.get(`/bigbluebutton/class`);

  return response;
}

export async function getClassByMeetingId(meetingId) {
  const response = await axios.get(`/bigbluebutton/class/${meetingId}`);

  return response;
}

export async function createClass(classCreateData) {
  const response = await axios.post(`/bigbluebutton/class`, classCreateData);

  return response;
}

export async function deleteClass(classId) {
  const response = await axios.delete(`/bigbluebutton/class/${classId}`);

  return response;
}

// bbb actions

export async function startBBB(meetingId, moderatorName) {
  const startClassResponse = await axios.post(`/bigbluebutton/class/start/${meetingId}`, {
    moderatorName,
  });

  return startClassResponse;
}

export async function joinBBB(meetingId, viewerName) {
  const joinResponse = await axios.post(`/bigbluebutton/class/join/${meetingId}`, {
    viewerName,
  });

  return joinResponse;
}

export async function checkBBB(url, secret) {
  const response = await axios.post('/bigbluebutton/verifyUrlAndSecret', {
    url,
    secret,
  });

  return response;
}

export async function bigBlueButtonSetting(url, secret) {
  const bbbSettingResponse = await axios.put('/bigbluebutton/updateSettings', {
    url,
    secret,
  });

  return bbbSettingResponse;
}

export async function getBigBlueButtonSetting() {
  const bbbSettingResponse = await axios.get('/bigbluebutton/getSettings');

  return bbbSettingResponse;
}
