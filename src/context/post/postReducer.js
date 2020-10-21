import {
    GET_POSTS,
    GET_USER_POST,
    ADD_POST,
    UPDATE_POST,
    DELETE_POST,
    POST_ERROR,
    CLEAR_POSTS,
    CLEAR_CURRENT,
    SET_CURRENT
} from '../types';

export default (state, action) => {
    switch(action.type) {
        case GET_POSTS:
            return{
                ...state,
                posts: action.payload,
                loading: false
            }
        case GET_USER_POST:
            return{
                ...state,
                post: action.payload,
                loading: false
            }
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
                isAuthorized: true,
                loading: false
            }
        case UPDATE_POST:
            return {
                ...state,
                posts: state.posts.map(post => 
                    post._id === action.payload._id ?
                    action.payload : post
                ),
                loading: false,
                isAuthorized: true
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => 
                    post._id !== action.payload),
                loading: false,
                isAuthorized: true
            };
            case CLEAR_POSTS:
                return {
                    ...state,
                    posts: null,
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
            case POST_ERROR:
                return {
                    ...state,
                    error: action.payload
                }
        default:
            return state;
    }
}