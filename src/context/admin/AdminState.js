import React, {useReducer} from 'react';
import AdminContext from './adminContext';
import adminReducer from './adminReducer';
import api from '../../utils/api';
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
} from '../types';

const AdminState = props => {
    const initialState = {
        users:null,
        current: null,
        isAuthorized: false,
        loading: true,
        error: null
    }

    const [state, dispatch] = useReducer(adminReducer, initialState);
   
      //Get all users
      const getUsers = async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await api.get('admin', {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            });

            dispatch({
                 type: GET_USERS, 
                 payload: res.data
                });
        } catch (err) {
            dispatch({type: USER_ERROR});
        }
    }

        //Register user
        const addUser = async formData => {
        
            try {
                const token = localStorage.getItem('token')
                const res = await api.post('admin/create-user', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer: ${token}`
                    }
                });
                
                dispatch({
                    type: ADD_USER,
                    payload: res.data
                });
    
            } catch (err) {
                dispatch({
                    type: REGISTER_FAIL,
                    payload: err.message
                });
            }
        };

        //Update User
        const updateUser = async user => {
         
            try {
                const token = localStorage.getItem('token')

                const res = await api.put(`admin/${user._id}`, user, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                dispatch({
                    type: UPDATE_USER,
                    payload: res.data
                });
    
            } catch (err) {
                dispatch({
                    type: USER_ERROR,
                    payload: err.message
                });
            }
        };

        //Delete User
        const deleteUser = async id => {
        
            try {
                // const token = localStorage.getItem('token')

                const res = await api.delete(`admin/${id}`);
                dispatch({
                    type: DELETE_USER,
                    payload: res.data
                });
    
            } catch (err) {
                dispatch({
                    type: USER_ERROR,
                    payload: err.message
                });
            }
        };

  //Clear contacts
  const clearUsers = () => dispatch({ type: CLEAR_USERS});

  //Set current contact
  const setCurrent = user => {
      dispatch({type: SET_CURRENT, payload: user});
  };

  //Clear current contact
  const clearCurrent = () => {
      dispatch({type: CLEAR_CURRENT});
  };

      
    return (
        <AdminContext.Provider
        value={{
            users: state.users,
            isAuthorized: state.isAuthorized,
            current: state.current,
            loading: state.loading,
            error: state.error,
            getUsers,
            addUser,
            updateUser,
            deleteUser,
            clearUsers,
            clearCurrent,
            setCurrent
        }}
        >
            {props.children}
        </AdminContext.Provider>
    )
};

export default AdminState;