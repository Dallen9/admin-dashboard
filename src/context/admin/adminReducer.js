import {
    REGISTER_FAIL,
    GET_USERS,
    UPDATE_USER,
    DELETE_USER,
    ADD_USER,
    USER_ERROR,
    CLEAR_USERS,
    CLEAR_CURRENT,
    SET_CURRENT
    // CLEAR_ERRORS
} from '../types';

export default (state, action) => {
    switch(action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false,
                isAuthorized: true
            }
        case ADD_USER:
            return {
                ...state,
                users: [action.payload, ...state.users],
                loading: false,
                isAuthorized: true
            }
        case UPDATE_USER:
            return {
                ...state,
                users: state.users.map(user => 
                    user._id === action.payload._id ?
                    action.payload : user
                ),
                loading: false,
                isAuthorized: true
            }
            case DELETE_USER:
                return {
                    ...state,
                    users: state.users.filter(user => 
                        user._id !== action.payload),
                    loading: false,
                    isAuthorized: true
                };
            case REGISTER_FAIL:
            case USER_ERROR:
                return {
                    ...state,
                    error: action.payload
                };
            case CLEAR_USERS:
                return {
                    ...state,
                    users: null,
                    error: null,
                    current: null
                }
            case SET_CURRENT:
                return {
                    ...state,
                    current: action.payload
                };
            case CLEAR_CURRENT:
                return {
                    ...state,
                    current: null
                };
        default:
            return state;
    }
}