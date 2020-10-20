import React, {Fragment, useContext} from 'react'
import {Navbar, Nav} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBookReader, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../context/auth/authContext';
import {Link} from 'react-router-dom';

const BlogNavbar = () => {
    const authContext = useContext(AuthContext);

    const {logout, isAuth, loading, user} = authContext;

    const authLinks = (
        <Fragment>
             {user && user.role === 'super_admin' ? (
            <Nav.Link as={Link} to='/blog'>
                Stories
               </Nav.Link>
                ) : (
                    <Nav.Link as={Link} to='/' >
                    Stories
                    </Nav.Link>
                )}
            
            <Nav.Link as={Link} to='/profile'>Profile</Nav.Link>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
              <Nav.Link as={Link} to='/register'>
                Register
            </Nav.Link>
            <Nav.Link as={Link} to='/login'>
                Login
            </Nav.Link>
        </Fragment>
    )
   
    return (
        <Fragment>
                <Navbar sticky="top" bg='dark' variant='dark' style={{overflow: 'hidden'}} >
                <Navbar.Brand as={Link} to='/'>
                        <FontAwesomeIcon  icon={faBookReader} style={{fontSize: '40px'}}/>
                        <h3 style={{display:'inline-block', marginLeft:'10px'}}>Amazing Blog</h3>
                </Navbar.Brand>
                <Nav className='nav-align'>
                    {isAuth && !loading ? authLinks : guestLinks}
                </Nav>
                {isAuth && !loading ? (
                <Link to='/' onClick={logout}>
                <FontAwesomeIcon  icon={faSignOutAlt} style={{fontSize: '25px', color: 'white'}}/> 
                <h6 style={{display: 'inline-block', color:'white', marginLeft:'10px', verticalAlign:'center !important'}}>Logout</h6> 
                </Link>
                ) : null
                }
            </Navbar>
        </Fragment>
    )
}


export default BlogNavbar
