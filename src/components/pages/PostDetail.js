import React, {useContext, useEffect} from 'react'
import {Card, Container, Spinner, Col, Row} from 'react-bootstrap';
import PostContext from '../../context/post/postContext';
import AuthContext from '../../context/auth/authContext';

const PostDetail = (props) => {
    const authContext = useContext(AuthContext);
    const postContext = useContext(PostContext);
    const {loading, post, getUserPost} = postContext;


    useEffect(() => {
        authContext.loadUser();
        getUserPost(props.match.params.id)
        //eslint-disable-next-line
    }, [])

    if(post !== null && post.length === 0 && !loading) {
        return <h4> Post unavailable</h4>
    }

    if(loading) {
        return (
        <Container className='loading'>
            <Spinner animation='border' size='large' />
        </Container>
        )
    } else {
    return (
        <Container>
            <Row className='mt-5'>
                <Col>
                <h6 style={{color: 'black'}}> by Name on {post.date} </h6>
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col>
                    <h1>{post.title}</h1>
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col>
                    <p>{post.body}</p>
                </Col>
            </Row>
        </Container>
    )
    }
}

export default PostDetail
