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

export async function startBBB(uid, moderatorName) {
  const startClassResponse = await axios.post(
    `/bigbluebutton/class/start/${uid}`,
    { moderatorName }
  );

  return startClassResponse;
}

export async function joinBBB(uid, viewerName) {
  const joinResponse = await axios.post(`/bigbluebutton/class/join/${uid}`, {
    viewerName,
  });
  return joinResponse;
}

export async function checkBBB(url, secret) {
  const response = await axios.post("/bigbluebutton/verifyUrlAndSecret", {
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
