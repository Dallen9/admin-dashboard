import React, {useReducer} from 'react';
import PostContext from './postContext';
import postReducer from './postReducer';
import api from '../../utils/api';
import {
    GET_POSTS,
    ADD_POST,
    UPDATE_POST,
    DELETE_POST,
    GET_USER_POSTS,
    POST_ERROR,
    CLEAR_USERS,
    CLEAR_CURRENT,
    GET_USER_POST,
    SET_CURRENT
} from '../types';

const PostState = props => {
    const initialState = {
        posts:null,
        post: null,
        userPosts: null,
        current: null,
        loading: true,
        isAuthorized: null,
        error: null
    }

    const [state, dispatch] = useReducer(postReducer, initialState);
   
      //Get all posts
      const getPosts = async () => {
        try {
            const res = await api.get('post');

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
                const res = await api.get(`post/${id}`);

                dispatch({
                    type: GET_USER_POST,
                    payload: res.data
                })
            } catch (err) {
                dispatch({
                    type: POST_ERROR,
                    payload: err.message
                });
            }
           
        }

        //get app post by a user
        const getAllUserPosts = async id => {
            try {
                const res = await api.get(`post/user/${id}`);

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
        const addPost = async (formData) => {
            try {
                const res = await api.post(`post`, formData, {
                    headers: {
                        'Content-Type': 'application/json',
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

                const res = await api.put(`post/${post._id}`, post, {
                    headers: {
                        'Content-Type': 'application/json'
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

                await api.delete(`admin/${id}`);
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
            post: state.post,
            userPosts: state.userPosts,
            current: state.current,
            loading: state.loading,
            error: state.error,
            getPosts,
            getUserPost,
            getAllUserPosts,
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