import instance from './axiosInstance'
const axios = instance

export async function getClass() {
    const response = await axios.get(`/bigbluebutton/class`)
    return response
}

export async function getClassByUID(classUID) {
    const response = await axios.get(`/bigbluebutton/class/${classUID}`)
    return response
}

export async function createClass(classCreateData) {
    const response = await axios.post(`/bigbluebutton/class`, classCreateData)
    return response
}

export async function deleteClass(classId) {
    const response = await axios.delete(`/bigbluebutton/class/${classId}`)
    return response
}

// bbb actions 

export async function startBBB(uid, bbbParams, fullName) {
    const startClassResponse = await axios.post(`/bigbluebutton/class/start/${uid}`, bbbParams)
    if (startClassResponse.status === 200) {
        const joinResponse = await joinBBB(uid, fullName, bbbParams)
        return joinResponse
    }
    return { error: true }
}

export async function joinBBB(uid, fullName, bbbParams) {
    const joinResponse = await axios.post(`/bigbluebutton/class/join/${uid}`, {
        fullName,
        "meetingID": bbbParams.meetingID,
        "password": bbbParams.moderatorPW
    })
    return joinResponse
}