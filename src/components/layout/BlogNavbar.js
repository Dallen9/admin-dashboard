import React, {Fragment, useContext, useEffect} from 'react'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBookReader, faSignOutAlt, faUser} from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../context/auth/authContext';
import {Link} from 'react-router-dom';

const BlogNavbar = () => {
    const authContext = useContext(AuthContext);

    const {logout, user, token, loadUser} = authContext;

    const authLinks = (
        <Fragment>
             {user && user.role  === 'super_admin'  ? (
            <Nav.Link as={Link} to='/blog'>
                Stories
               </Nav.Link>
                ) : (
                    <Nav.Link as={Link} to='/' >
                    Stories
                    </Nav.Link>
                )}
                  
            {user && user.role !== 'Subscriber'  && (
                <NavDropdown className='ml-1' title={<FontAwesomeIcon icon={faUser} size='lg'/>} id='collapsible-nav-dropdown'>
                    <NavDropdown.Item  as={Link} to='/profile'>Profile</NavDropdown.Item>
                    <NavDropdown.Item  as={Link} to='/create-post'>New Story</NavDropdown.Item>
                    <NavDropdown.Item  as={Link} to='/user-posts'>Published</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item  as={Link} to='/account'>Account</NavDropdown.Item>
                </NavDropdown>
            )} 
            {user && user.role === 'Subscriber' && (
                <Nav.Link className='my-auto ml-1' as={Link} to='/account'>Account</Nav.Link>
            )}
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
       if(token) {
            loadUser();
       }
    // eslint-disable-next-line
   }, [token])
   
    return (
        <Fragment>
            <Navbar collapseOnSelect expand="md" sticky="top" bg='dark' variant='dark' className='px-4' style={{minHeight: '80px' }}>
                <Navbar.Brand className='d-flex align-items-center' as={Link} to='/'>
                        <FontAwesomeIcon  icon={faBookReader} size='2x'/>
                        <h3 className='my-auto ml-2'>Amazing Blog</h3>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className='ml-auto pr-2'>
                        {token ? authLinks : guestLinks}
                    </Nav>
                    <Nav>
                        {token ? (
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
