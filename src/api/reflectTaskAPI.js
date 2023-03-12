import axios from 'axios';

// const baseURL = "http://localhost:4000"
const baseURL = "https://edu-chatbot-server.onrender.com"

export const createReflectTask = async (lineUserId, taskId, reflect1, reflect2, score, isSelf) => {
    try {
        const reflect = {
            reflect1: reflect1,
            reflect2: reflect2,
            score: score,
            is_self: isSelf
        }
        const url = `${baseURL}/reflect/task/create/${taskId}/LUID/${lineUserId}`
        const response = await axios.post(url, reflect, {
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

export const getReflectTask = async (taskId,studentId) => {
    try {
        const url = `${baseURL}/reflect/task/${taskId}/student/${studentId}`
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


