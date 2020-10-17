import React, {Fragment, useContext, useEffect} from 'react'
import {Card, Container, Spinner} from 'react-bootstrap';
import PostContext from '../../context/post/postContext';
import AuthContext from '../../context/auth/authContext';
import PostDetail from './PostDetail';
import stock from '../../assets/stock.jpg';
const Post = () => {
    const authContext = useContext(AuthContext);
    const postContext = useContext(PostContext);
    const {getPosts, loading, posts} = postContext;

    const loadDetail = (key, post) => {
        return (
            <div>
            <PostDetail key={key} post={post} />
            </div>
        )
    }
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
            <Container className='mt-5'>
            <h2>Crazy Stories</h2>
            <p>{posts.length} stories</p>
            <Container className='layout' >
                {posts !== null && !loading && (
                    posts.map(post => (
                        
                       
                       <div>
                        <Card key={post._id} className='card-layout'>
                            <a style={{color:'black'}} href='/detail' onClick={() => <PostDetail />} >
                            <Card.Img variant= 'top' className='card-img' src={stock} alt='stock'/>
                            <Card.Body>
                            <h4>{post.title}</h4>
                            <p style={{color: 'grey', marginBottom: '5px'}}>{post.date}</p>
                            <h6 style={{textTransform: 'capitalize'}}>By {post.user.name}</h6>
                                <p>{post.body}</p> 
                            </Card.Body>
                            </a>
                        </Card>
                        </div>
                     
                    ))
                )} 
                </Container>
            </Container>
        )
    }
}

export default Post
