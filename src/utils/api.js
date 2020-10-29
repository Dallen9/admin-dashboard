import axios from 'axios';
const {REACT_APP_API_URL} = process.env;

const api = axios.create({
    baseURL: REACT_APP_API_URL
});

// api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
// api.defaults.headers.post['Content-Type'] = 'application/json';

api.interceptors.request.use(
    config => {
        const token = localStorage.token;
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });


export default api;
