import React, {useContext, useEffect} from 'react'
import {Container, Row, Col, Image, Spinner} from 'react-bootstrap';
import AuthContext from '../../context/auth/authContext';
import PostContext from '../../context/post/postContext';
import PostItem from '../post/PostItem';

// import {faUser} from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Profile = () => {
    const authContext = useContext(AuthContext);
    const postContext = useContext(PostContext)
    
    const{user} = authContext;
    const {getAllUserPosts, loading, userPosts} = postContext;

   
    useEffect(() => {
        getAllUserPosts(user && user._id)

        return () => {
            getAllUserPosts(user && user._id)
        }
    // eslint-disable-next-line
    }, [loading, user])

    // if(userPosts && userPosts !== null && userPosts.posts.length === 0 && !loading) {
    //     return <h4>No post available...</h4>
    // }
  
    return (
        <Container >
            <Row>
                <Col md={3} className='mx-auto'>
                    <div className='d-flex flex-column align-items-center text-center p-3 py-5'> 
                    <Image className=" mt-5" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQF2psCzfbB611rnUhxgMi-lc2oB78ykqDGYb4v83xQ1pAbhPiB&usqp=CAU" roundedCircle/>
                        <span className="font-weight-bold">{ user && user.name}</span>
                        <span className="text-black-50">{user && user.email}</span>
                        <span>{user && user.username} </span>
                    </div>
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col>
                <h6><strong>Stories</strong></h6>
                <hr style={{borderBottom: 'black 1px solid'}}/>
                </Col>
            </Row>
            <Row  >
                {userPosts && userPosts !== null && userPosts.posts.length === 0 && !loading ? (
                    <div>
                <span className="sr-only">No post Available</span>
                    </div>
                )
                
         : 
                (userPosts && userPosts.posts !== null && !loading ? (
                    userPosts.posts.map(post => {
                             return (
                                <Col key={post._id}  md={6} lg={4} >
                                    <PostItem key={post._id} post={post} />
                                </Col>
                            )}
                        )
                    ) 
                    :  <Container className='loading'>
                            <Spinner animation='border' size='large' />
                        </Container>
                        )
                    
                }
            </Row> 
        </Container>
    )
}

export default Profile
