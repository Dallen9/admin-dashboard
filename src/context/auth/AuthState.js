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
    // CLEAR_ERRORS
} from '../types';

const AuthState = props => {
    const initialState = {
        token: null,
        isAuth: null,
        loading: true,
        user: null,
        error: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

      //Load user
      const loadUser = async () => {
   
        try {
            const token = localStorage.getItem('token')
            const res = await api.get('auth', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

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
                const res = await api.post('users', formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: res.data
                });
    
                loadUser();
            } catch (err) {
                dispatch({
                    type: REGISTER_FAIL,
                    payload: err.message
                });
            }
        };

        //Login User
        const login = async formData => {
         
            try {
                const res = await api.post('auth', formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data
                });
    
                loadUser();
            } catch (err) {
                dispatch({
                    type: LOGIN_FAIL,
                    payload: err.message
                });
            }
        };

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
            register,
            loadUser,
            login,
            logout
        }}
        >
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthState;