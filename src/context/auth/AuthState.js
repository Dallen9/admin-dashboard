import React, {useReducer} from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import api from '../../utils/api';
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

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuth: null,
        loading: true,
        user: null,
        error: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

      //Load user
      const loadUser = async () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            }
        }

        try {
            const res = await api.get('auth', config);

            dispatch({
                 type: USER_LOADED, 
                 payload: res.data
                });

        } catch (err) {
            dispatch({type: AUTH_ERROR});
        }
    }

        //Register user
        const register = async formData => {
        
            try {
                const res = await api.post('users', formData)
                
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: res.data
                });
                return true
                // loadUser();
            } catch (err) {
                dispatch({
                    type: REGISTER_FAIL,
                    payload: err.response.status
                });
                return false
            }
        };

        //Login User
        const login = async formData => {
         
            try {
                const res = await api.post('auth', formData);

                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data
                });
                loadUser();
                return true

            } catch (err) {
                dispatch({
                    type: LOGIN_FAIL,
                    payload: err.response.status
                });
                return false
            }
        };

           //Update user
    const updateUser = async user => {

        try {
           const res = await api.put(`auth/update-account/${user._id}`, user);
           
           dispatch({
               type: UPDATE_USER, 
               payload: res.data
           })
           loadUser();
       } catch(err) {
           dispatch({
               type: AUTH_ERROR,
               payload: err.response.msg
           })
       }
    };
        //Set current user
        const setCurrent = user => {
            dispatch({type: SET_CURRENT, payload: user});
        };

        const clearErrors = () => dispatch({type: CLEAR_ERRORS})


        //Logout
        const logout = () => dispatch({type: LOGOUT});
    return (
        <AuthContext.Provider
        value={{
            token: state.token,
            isAuth: state.isAuth,
            loading: state.loading,
            error: state.error,
            user: state.user,
            updateUser,
            setCurrent,
            register,
            loadUser,
            login,
            logout,
            clearErrors
        }}
        >
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthState;