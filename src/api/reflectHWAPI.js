import axios from 'axios';

const baseURL = "http://localhost:4000"
// const baseURL = "https://edu-chatbot-server.onrender.com"

export const getHomework = async (HWNo) => {
    try {
        const url = `${baseURL}/homework/hw_no/${HWNo}`
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

export const getHomeworkReflect = async (HWNo, studentId) => {
    try {
        const url = `${baseURL}/reflect/homework/hw_no/${HWNo}/id/${studentId}`
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

export const createHomeworkReflect = async (HWNo, lineUserId, reflects, checks, groupScore, score) => {
    try {
        const reflect = {
            reflect1: reflects.reflect1,
            reflect2: reflects.reflect2,
            reflect3: reflects.reflect3,
            reflect4: reflects.reflect4,
            group_score: groupScore,
            score: score,
            rule1_checked: checks[0],
            rule2_checked: checks[1],
            rule3_checked: checks[2]
        }
        const url = `${baseURL}/reflect/homework/create/hw_no/${HWNo}/LUID/${lineUserId}`
        const response = await axios.post(url, reflect , {
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

export const getCheckHomework = async (HWNo, studentId) => {
    try {
        const url = `${baseURL}/reflect/homework/check/hw_no/${HWNo}/id/${studentId}`
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


