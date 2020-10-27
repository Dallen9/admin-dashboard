import { config } from '@fortawesome/fontawesome-svg-core';
import axios from 'axios';
const {REACT_APP_API_URL} = process.env;

const api = axios.create({
    baseURL: REACT_APP_API_URL
});

api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
api.defaults.headers.post['Content-Type'] = 'application/json';


export default api;
