import React, {Fragment, useContext, useEffect} from 'react'
import {Navbar, Nav} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBookReader, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../context/auth/authContext';
import {Link} from 'react-router-dom';

const BlogNavbar = () => {
    const authContext = useContext(AuthContext);

    const {logout, isAuth, loading, user, token, loadUser} = authContext;

    const authLinks = (
        <Fragment>
             {user && user.role  === 'super_admin' ? (
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
   useEffect(() => {
    if (token) {
        loadUser();
    }
    // eslint-disable-next-line
   }, [])
   
    return (
        <Fragment>
                <Navbar collapseOnSelect expand="md" sticky="top" bg='dark' variant='dark' className='px-4' style={{minHeight: '80px' }}>
                <Navbar.Brand className='d-flex align-items-center' as={Link} to='/'>
                        <FontAwesomeIcon  icon={faBookReader} size='2x'/>
                        <h3 className='my-auto ml-2' >Amazing Blog</h3>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='ml-auto pr-2'>
                    {isAuth  && !loading ? authLinks : guestLinks}
                </Nav>
                <Nav>
                {isAuth && !loading ? (
                <Nav.Link as={Link} to='/'className='d-flex align-items-center' onClick={logout}>
                <FontAwesomeIcon  icon={faSignOutAlt} size='lg' color='white'/> 
                <h6 className='my-auto ml-1 text-white'>Logout</h6> 
                </Nav.Link>
                ) : null
                }
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Fragment>
    )
}


export default BlogNavbar
