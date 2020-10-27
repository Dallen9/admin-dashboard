import React, {useContext, useEffect, useState} from 'react'
import {Container, Row, Col, Image, Spinner, Card, Button} from 'react-bootstrap';
import AuthContext from '../../context/auth/authContext';
import PostContext from '../../context/post/postContext';
import stock from '../../assets/stock.jpg';
import { Link } from 'react-router-dom';

const UserPost = (props) => {
    const authContext = useContext(AuthContext);
    const postContext = useContext(PostContext)
    
    const{user} = authContext;
    const {getAllUserPosts, loading, userPosts, deletePost, setCurrent, clearCurrent, post} = postContext;

    const [clicked, setClicked] = useState(false)

    const clickedBtn = () => {
        setClicked({clicked: !clicked})
    }; 
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
    }, [loading, user, post, props])

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
                                                <Link className='d-flex flex-column' id={post._id} to={'/user-posts/' + post._id}> 
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
