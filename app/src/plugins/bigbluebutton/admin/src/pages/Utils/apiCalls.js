import axios from 'axios'
export async function getClass() {
    const response = await axios.get('/api/bigbluebutton/class')
    return response.data
}

export async function getClassById(id) {
    const response = await axios.get(`/api/bigbluebutton/class/${id}`)
    return response.data
}

export async function createClass(classData) {
    const response = await axios.post(`/api/bigbluebutton/class`, data, {
        headers: {
            "content-type": "application/json"
        }
    });
    return response.data
}

export async function updateClass(id, classData) {
    const response = await axios.put(`/api/bigbluebutton/class/${id}`, data, {
        headers: {
            "content-type": "application/json"
        }
    });
    return response.data
}

export async function deleteClass(id) {
    const response = await axios.delete(`/api/bigbluebutton/class/${id}`);
    return response.data
}