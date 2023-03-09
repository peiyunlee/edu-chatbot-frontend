import axios from 'axios';

export const getLineUserProfile = async (accessToken) => {
    try {

        const url = `https://api.line.me/v2/profile`
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
              }
        })

        console.log(response)
        return response.json();

    } catch (err) {
        console.log(err.response);
        return null
    }
}