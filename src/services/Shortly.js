import axios from 'axios';

const Base_URL = 'https://back-projeto-16.herokuapp.com'

async function postLogin(login) {
    const token = await axios.post(`${Base_URL}/signin`,login);
    return token;
}

async function postSignup(signup) {
    const response = await axios.post(`${Base_URL}/signup`,signup);
    return response;
}

async function getRanking() {
    const ranking = await axios.get(`${Base_URL}/ranking`);
    return ranking;
}

export {postLogin,postSignup, getRanking}