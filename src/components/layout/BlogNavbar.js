import React, {Fragment, useContext} from 'react'
import {Navbar, Nav, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBookReader, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../context/auth/authContext';

const BlogNavbar = () => {
    const authContext = useContext(AuthContext);

    const {logout} = authContext;

    return (
        <Fragment>
            <Navbar bg='dark' variant='dark' className='spacer' >
                <Navbar.Brand href='/'>
                    <a>
                        <FontAwesomeIcon  icon={faBookReader} style={{fontSize: '40px'}}/>
                        <h3 style={{display:'inline-block', marginLeft:'10px'}}>Amazing Blog</h3>
                    </a>
                </Navbar.Brand>
                <Nav className='nav-align'>
                    <Nav.Link>Stories</Nav.Link>
                    <Nav.Link>Profile</Nav.Link>
                  
                </Nav>
                <a href='#' onClick={logout}>
                <FontAwesomeIcon  icon={faSignOutAlt} style={{fontSize: '25px', color: 'white'}}/> 
                <h6 style={{display: 'inline-block', color:'white', marginLeft:'10px', verticalAlign:'center !important'}}>Logout</h6> 
                </a>
            </Navbar>
        </Fragment>
    )
}


export default BlogNavbar
