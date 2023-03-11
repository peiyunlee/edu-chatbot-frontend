import axios from 'axios';

// const baseURL = "http://localhost:4000"
const baseURL = "https://edu-chatbot-server.onrender.com"

export const getTaskList = async (lineUserId, hwNoNow) => {
    try {
        const url = `${baseURL}/task/LUID/${lineUserId}/hw_no/${hwNoNow}/all`
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

export const getTask = async (taskId) => {
    try {
        const url = `${baseURL}/task/id/${taskId}`
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

export const createTask = async (lineUserId, hw_no, task_name, plan, hand_over_date, hand_over) => {
    try {
        const task = {
            hw_no: hw_no,
            task_name: task_name,
            plan: plan,
            hand_over_date: hand_over_date,
            hand_over: hand_over
        }
        const url = `${baseURL}/task/create/LUID/${lineUserId}`
        const response = await axios.post(url, task, {
            headers: {
                'Accept': 'application/json'
            }
        })
    } catch (err) {
        console.log(err.response);
        return null
    }
}

export const claimTask = async (lineUserId, task_id) => {
    try {
        const url = `${baseURL}/task/claim/LUID/${lineUserId}/id/${task_id}`
        const response = await axios.post(url, {
            headers: {
                'Accept': 'application/json'
            }
        })
    } catch (err) {
        console.log(err.response);
        return null
    }
}

export const updateTask = async (taskId, task_name, plan, hand_over_date, hand_over) => {
    try {
        const task = {
            task_name: task_name,
            plan: plan,
            hand_over_date: hand_over_date,
            hand_over: hand_over
        }
        const url = `${baseURL}/task/id/${taskId}`
        const response = await axios.patch(url, task, {
            headers: {
                'Accept': 'application/json'
            }
        })
    } catch (err) {
        console.log(err.response);
        return null
    }
}


export const deleteTask = async (task_id) => {
    try {
        const url = `${baseURL}/task/id/${task_id}`
        const response = await axios.delete(url, {
            headers: {
                'Accept': 'application/json'
            }
        })
    } catch (err) {
        console.log(err.response);
        return null
    }
}



export const getHW = async (HWNo) => {
    try {
        const url = `${baseURL}/homework/hw_no/${HWNo}`
        const response = await axios.get(url, {
            headers: {
                'Accept': 'application/json'
            }
        })

        console.log(response)
        return response.data;

    } catch (err) {
        console.log(err.response);
        return null
    }
}

