import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL

export const getGroupMembersByLUID = async (lineUserId) => {
    try {
        const url = `${baseURL}/student/group/all/LUID/${lineUserId}`
        const response = await axios.get(url, {
            headers: {
                'Accept': 'application/json'
            }
        })

        // console.log(response)
        return response.data;

    } catch (err) {
        console.log(err.response);
        return null
    }
}

export const getStudentByLUID = async (lineUserId) => {
    try {
        const url = `${baseURL}/student/LUID/${lineUserId}`
        const response = await axios.get(url, {
            headers: {
                'Accept': 'application/json'
            }
        })

        // console.log(response)
        return response.data;

    } catch (err) {
        console.log(err.response);
        return null
    }
}

export const getStudentByStudentId = async (studentId) => {
    try {
        const url = `${baseURL}/student/id/${studentId}`
        const response = await axios.get(url, {
            headers: {
                'Accept': 'application/json'
            }
        })

        // console.log(response)
        return response.data;

    } catch (err) {
        console.log(err.response);
        return null
    }
}