import React, {useReducer} from 'react';
import PostContext from './postContext';
import postReducer from './postReducer';
import api from '../../utils/api';
import {
    GET_POSTS,
    ADD_POST,
    UPDATE_POST,
    DELETE_POST,
    POST_ERROR,
    CLEAR_USERS,
    CLEAR_CURRENT,
    GET_USER_POSTS,
    SET_CURRENT
} from '../types';

const PostState = props => {
    const initialState = {
        posts:null,
        current: null,
        loading: true,
        isAuthorized: null,
        error: null
    }

    const [state, dispatch] = useReducer(postReducer, initialState);
   
      //Get all posts
      const getPosts = async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await api.get('post', {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            });

            dispatch({
                 type: GET_POSTS, 
                 payload: res.data
                });
        } catch (err) {
            dispatch({type: POST_ERROR});
        }
    }

        //get user post with post ID
        const getUserPost = async id => {
            try {
                const token = localStorage.getItem('token');
                const res = await api.get(`post/${id}`, {
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    }
                });

                dispatch({
                    type: GET_USER_POSTS,
                    payload: res.data
                })
            } catch (err) {
                dispatch({
                    type: POST_ERROR,
                    payload: err.message
                });
            }
           
        }

        //add post
        const addPost = async formData => {
            try {
                const token = localStorage.getItem('token')
                const res = await api.post('admin/post', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer: ${token}`
                    }
                });
                
                dispatch({
                    type: ADD_POST,
                    payload: res.data
                });
    
            } catch (err) {
                dispatch({
                    type: POST_ERROR,
                    payload: err.message
                });
            }
        };

        //Update User
        const updatePost = async post => {
         
            try {
                const token = localStorage.getItem('token')

                const res = await api.put(`post/${post._id}`, post, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                dispatch({
                    type: UPDATE_POST,
                    payload: res.data
                });
    
            } catch (err) {
                dispatch({
                    type: POST_ERROR,
                    payload: err.message
                });
            }
        };

        //Delete User
        const deletePost = async id => {
        
            try {
                const token = localStorage.getItem('token')

                await api.delete(`admin/${id}`,{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                dispatch({
                    type: DELETE_POST,
                    payload: id
                });
    
            } catch (err) {
                dispatch({
                    type: POST_ERROR,
                    payload: err.message
                });
            }
        };

  //Clear Post
  const clearPosts = () => dispatch({ type: CLEAR_USERS});

  //Set current contact
  const setCurrent = user => {
      dispatch({type: SET_CURRENT, payload: user});
  };

  //Clear current contact
  const clearCurrent = () => {
      dispatch({type: CLEAR_CURRENT});
  };

      
    return (
        <PostContext.Provider
        value={{
            posts: state.posts,
            current: state.current,
            loading: state.loading,
            error: state.error,
            getPosts,
            getUserPost,
            addPost,
            updatePost,
            deletePost,
            clearPosts,
            clearCurrent,
            setCurrent
        }}
        >
            {props.children}
        </PostContext.Provider>
    )
};

export default PostState;