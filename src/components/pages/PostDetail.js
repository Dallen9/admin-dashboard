import React, {useContext, useEffect} from 'react'
import {Container, Spinner, Col, Row} from 'react-bootstrap';
import PostContext from '../../context/post/postContext';

const PostDetail = (props) => {
    const postContext = useContext(PostContext);
    const {loading, post, getUserPost} = postContext;


    useEffect(() => {
        getUserPost(props.match.params.id)
        //eslint-disable-next-line
    }, [])

    if(post !== null && post.length === 0 && !loading) {
        return <h4> Post unavailable</h4>
    }

    if(loading && post !== null) {
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
                <h6 style={{color: 'black'}}> by Name on {post && post.date} </h6>
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col>
                    <h1>{post && post.title}</h1>
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col>
                    <p>{post && post.body}</p>
                </Col>
            </Row>
        </Container>
    )
    }
}

export default PostDetail
