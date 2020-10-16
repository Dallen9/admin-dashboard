import React, {useContext, useEffect} from 'react'
import {Card, Container, Spinner} from 'react-bootstrap';
import PostContext from '../../context/post/postContext';
import AuthContext from '../../context/auth/authContext';

const Post = () => {
    const authContext = useContext(AuthContext);
    const postContext = useContext(PostContext);
    const {getPosts, loading, posts} = postContext;

    useEffect(() => {
        getPosts();
        authContext.loadUser();
        //eslint-disable-next-line
    }, []);

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
            <>
                {posts !== null && !loading && (
                    posts.map(post => (
                       <Container fluid>
                           <Card>
                               <Card.Title>
                                   {post.title}
                               </Card.Title>
                               <Card.Body>
                                  
                                    <h2>{post.user.name}</h2>
                                  
                                  <p>{post.body}</p> 
                               </Card.Body>
                           </Card>
                       </Container>
                    ))
                )}   
            </>
        )
    }
}

export default Post
