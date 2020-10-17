import React, {Fragment, useContext, useEffect} from 'react'
import {Card, Container, Spinner} from 'react-bootstrap';
import PostContext from '../../context/post/postContext';
import AuthContext from '../../context/auth/authContext';

const PostDetail = ({post}) => {
    const authContext = useContext(AuthContext);
    const postContext = useContext(PostContext);
    const {getPosts, loading, posts, getUserPost} = postContext;
    // const {_id, title, name, date} = post

    useEffect(() => {
        authContext.loadUser();
        getUserPost()
        //eslint-disable-next-line
    }, [])

    return (
        <Container>
            <h1 style={{color: 'black'}}> </h1>
        </Container>
    )
}

export default PostDetail
