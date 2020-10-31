import axios from 'axios';
const {REACT_APP_API_URL} = process.env;

const api = axios.create({
    baseURL: REACT_APP_API_URL
});

api.interceptors.request.use(
    config => {
        const token = localStorage.token;
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
            config.headers['Content-Type'] = 'application/json';
        }
        return config;
    },
    error => {
          Promise.reject(error)
    });


export default api;
