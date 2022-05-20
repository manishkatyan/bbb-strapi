import pluginId from "../pluginId";
import instance from "./axiosInstance";
const axios = instance;

function getServiceUri() {
  return strapi.backendURL;
}

export async function getClass() {
  const response = await axios.get(`/bigbluebutton/class`);
  return response;
}

export async function getClassByUID(classUID) {
  const response = await axios.get(`/bigbluebutton/class/${classUID}`);
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

export async function startBBB(uid, bbbParams, fullName) {
  const startClassResponse = await axios.post(
    `/bigbluebutton/class/start/${uid}`,
    bbbParams
  );
  if (startClassResponse.status === 200) {
    const joinResponse = await joinBBB(uid, fullName, bbbParams);
    return joinResponse;
  }
  return { error: true };
}

export async function joinBBB(uid, fullName, bbbParams) {
  const joinResponse = await axios.post(`/bigbluebutton/class/join/${uid}`, {
    fullName,
    meetingID: bbbParams.meetingID,
    password: bbbParams.moderatorPW,
    "userdata-bbb_skip_check_audio": bbbParams["userdata-bbb_skip_check_audio"],
    "userdata-bbb_listen_only_mode": bbbParams["userdata-bbb_listen_only_mode"],
  });
  return joinResponse;
}

export async function checkBBB(url, secret) {
  const response = await axios.post("/bigbluebutton/check/bbb", {
    url,
    secret,
  });
  return response;
}

export async function bigBlueButtonSetting(url, secret) {
  const bbbSettingResponse = await axios.put("/bigbluebutton/updateSettings", {
    url,
    secret,
  });
  return bbbSettingResponse;
}

export async function getBigBlueButtonSetting() {
  const bbbSettingResponse = await axios.get("/bigbluebutton/getSettings");
  return bbbSettingResponse;
}
