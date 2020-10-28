import React, {useContext, useEffect} from 'react'
import {Container, Row, Col, Spinner, Card, Button} from 'react-bootstrap';
import PostContext from '../../context/post/postContext';
import stock from '../../assets/stock.jpg';
import { Link } from 'react-router-dom';

const UserPost = () => {
    const postContext = useContext(PostContext)
    
    const {getAllUserPosts, loading, userPosts, deletePost, setCurrent, clearCurrent, post} = postContext;

    const truncate = (post, size) => {
        return post.length > size ? post.slice(0, size - 1) + "…" : post;
    }

    const onDelete =(id) => {
        deletePost(id)
        clearCurrent() 
    }

    useEffect(() => {
        getAllUserPosts()

        //eslint-disable-next-line
    }, [loading, post])

    return (
        <>
        <Container>
            <Row className='my-5'>
                <Col>
                <h1>Published Stories</h1>
                </Col>
            </Row>
            <Row>
            {userPosts && userPosts !== null && userPosts.posts.length === 0 && !loading && (
                <Container>
                    <Row>
                        <Col>
                            <h4> No post available...</h4>
                        </Col>
                    </Row>
                </Container>
              
            )}
            {userPosts && userPosts.posts !== null && !loading ? (
                    userPosts.posts.map(post => {
                             return (
                                <Col className='my-4' key={post._id}  md={6} lg={4} >
                                    <Card>
                                    <Card.Img variant= 'top' className='card-img' src={stock} alt='stock'/>
                                       <Card.Body>
                                        <h5>{truncate(post.title, 36)}</h5>
                                        <small className='text-muted'>{post.date}</small>
                                        <h6 style={{textTransform: 'capitalize', marginBottom: '0 !important'}}>By {post.user.name}</h6>
                                         <Row className='mt-3 d-flex'>
                                             <Col className='d-flex  flex-column'>
                                                <Link className='d-flex flex-column' id={post._id} to={{
                                                    pathname: '/user-posts/' + post._id,
                                                    state: post
                                                    }}> 
                                             <Button className='px-4' onClick={() => setCurrent(post)} >Edit</Button>
                                             </Link> 
                                             </Col>
                                             <Col className='d-flex flex-column '>
                                             <Button  className='px-4' variant='danger' onClick={() => onDelete(post._id)}>
                                                 Delete
                                             </Button>
                                             </Col>
                                         </Row> 
                                       </Card.Body>
                                    </Card>
                                </Col>
                            )}
                        )
                    ) 
                    :  <Container className='d-flex flex-column justify-content-center align-items-center'>
                            <Spinner  animation='border' size='large' />
                        </Container>
                    }
            </Row>
        </Container>
        </>
    )
}

export default UserPost
