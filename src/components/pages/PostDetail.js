import React, {Fragment, useContext, useEffect} from 'react'
import {Card, Container, Spinner} from 'react-bootstrap';
import PostContext from '../../context/post/postContext';
import AuthContext from '../../context/auth/authContext';
import PropTypes from 'prop-types';

const PostDetail = ({post}) => {
    const authContext = useContext(AuthContext);
    // const postContext = useContext(PostContext);
    // const {getPosts, loading, posts} = postContext;
    
// const {title, body, _id} = post
    useEffect(() => {
        authContext.loadUser();
       
        //eslint-disable-next-line
    }, [])
    return (
        <div>
            <h1> Hello</h1>
        </div>
    )
}

export default PostDetail
