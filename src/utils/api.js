import axios from 'axios';
const {REACT_APP_API_URL} = process.env;

let headers = {};

if(localStorage.token) {
    headers.Authorization = `Bearer ${localStorage.token}`
}

export default axios.create({
    baseURL: REACT_APP_API_URL,
    headers
});