import React from 'react'
import {Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import stock from '../../assets/stock.jpg';

const PostItem = ({post}) => {
    return (
        <Card key={post._id} className='card-layout' >
            <Link style={{color: 'black'}} to={'/detail/' + post._id}>
            <Card.Img variant= 'top' className='card-img' src={stock} alt='stock'/>
            <Card.Body>
            <h4>{post.title}</h4>
            <small className='text-muted'>{post.date}</small>
            <h6 style={{textTransform: 'capitalize'}}>By {post.user.name}</h6>
                <p>{post.body}</p> 
            </Card.Body>
            </Link>
        </Card>           
    )
}

export default PostItem
