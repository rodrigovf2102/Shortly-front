import axios from 'axios';

const Base_URL = 'http://localhost:4000'

async function postLogin(login) {
    const token = await axios.post(`${Base_URL}/signin`,login);
    return token;
}

export {postLogin}