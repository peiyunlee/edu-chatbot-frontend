import axios from 'axios';

const baseURL = "http://localhost:4000"

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