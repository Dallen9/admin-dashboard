import React, {Fragment, useContext, useEffect} from 'react'
import {Card, Container, Spinner, Row, Col} from 'react-bootstrap';
import PostContext from '../../context/post/postContext';
import AuthContext from '../../context/auth/authContext';

import PostItem from '../post/PostItem';
const Post = () => {
    const authContext = useContext(AuthContext);
    const postContext = useContext(PostContext);
    const {getPosts, loading, posts, getUserPost} = postContext;

    
    useEffect(() => {
        getPosts();
        authContext.loadUser();
        //eslint-disable-next-line
    }, [loading]);

    if(posts !== null && posts.length === 0 && !loading) {
        return <h4>No post available...</h4>
    }

    if(loading) {
        return (
            <Container className='loading'>
                <Spinner animation='border' size='large' />
            </Container>
        )
    } else {
        return (
            <Container className='mt-5'>
            <h2>Crazy Stories</h2>
            <p>{posts !== null ? posts.length : null} stories</p>
            <Row className='mt-2'>
            
                {posts !== null && !loading ? (
                    posts.map(post => {
                       return (
                        <Col md={6} lg={4} className='d-flex flex-column align-items-center '>
                       <PostItem key={post._id} post={post} />
                       </Col>
                       )
                       }
                    )
                ) :  <Container className='loading'>
                        <Spinner animation='border' size='large' />
                    </Container>
                } 
                 
                </Row>
            </Container>
           
        )
    }
}

export default Post
