import axios from 'axios';
const {REACT_APP_HEADER} = process.env;

const setAuthToken = token => {
    if(token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;