import instance from './axiosInstance'
const axios = instance

export async function getClass() {
    const response = await axios.get(`/api/bigbluebutton/class`)
    return response
}

export async function getClassById(classId) {
    const response = await axios.get(`/api/bigbluebutton/class/${classId}`)
    return response
}

export async function createClass(classCreateData) {
    const response = await axios.post(`/api/bigbluebutton/class`, classCreateData)
    return response
}

export async function deleteClass(classId) {
    const response = await axios.delete(`/api/bigbluebutton/class/${classId}`)
    return response
}

// bbb actions 

export async function startBBB(uid, bbbParams, fullName) {
    const startClassResponse = await axios.post(`/api/bigbluebutton/class/start/${uid}`, bbbParams)
    if (startClassResponse.status === 200) {
        const joinResponse = await axios.post(`/api/bigbluebutton/class/join/`, {
            fullName,
            "meetingID": bbbParams.meetingID,
            "password": bbbParams.moderatorPW
        })
        return joinResponse
    }
    return { error: true }
}