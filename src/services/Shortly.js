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

async function postUrl(token,link){
    const response = await axios.post(`${Base_URL}/urls/shorten`,link,token);
    return response;   
}

async function getUserUrls(token){
    const response = await axios.get(`${Base_URL}/users/me`,token);
    return response; 
}

async function deleteUrl(token,id){
    console.log(id)
    const response = await axios.delete(`${Base_URL}/urls/${id}`,token);
    return response; 
}

async function redirectUrl(shortUrl){
    const response = await axios.get(`${Base_URL}/urls/open/${shortUrl}`);
    return response; 
}


export {postLogin,postSignup, getRanking, postUrl, getUserUrls, deleteUrl, redirectUrl}