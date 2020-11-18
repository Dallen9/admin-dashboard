import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_CURRENT,
    UPDATE_USER,
    CLEAR_ERRORS
} from '../types';

export default (state, action) => {
    switch(action.type) {
        case USER_LOADED: 
            return {
                ...state,
                isAuth: true,
                loading: false,
                user: action.payload
            };
        case REGISTER_SUCCESS: 
        case LOGIN_SUCCESS:
        localStorage.token = action.payload.token
            return {
                ...state,
                token: action.payload,
                isAuth: true,
                loading: false
            };
        case UPDATE_USER:
            return {
                ...state,
                user: state.user._id === action.payload._id ? action.payload : state.user,
                loading: false,
                isAuth: true
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuth: false,
                loading: false,
                user: null,
                error: action.payload
            };
        case SET_CURRENT:
            return {
                ...state,
                user: action.payload
            }
        case CLEAR_ERRORS: 
            return {
                ...state,
                error: null
            };
       
        default: 
            return state;
    }
}