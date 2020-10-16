import React, {Fragment, useContext} from 'react'
import {Navbar, Nav} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBookReader, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../context/auth/authContext';
import {Link} from 'react-router-dom';

const BlogNavbar = () => {
    const authContext = useContext(AuthContext);

    const {logout, isAuth, loading} = authContext;

    const authLinks = (
        <Fragment>
            <Nav.Link>
                <Link to='/post'>
                Stories
                </Link>
            </Nav.Link>
            <Nav.Link>Profile</Nav.Link>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
              <Nav.Link>
                <Link to='/register'>
                Register
                </Link>
            </Nav.Link>
            <Nav.Link>
                <Link to='/login'>
                Login
                </Link>
            </Nav.Link>
        </Fragment>
    )
   
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
                    {isAuth && !loading ? authLinks : guestLinks}
                </Nav>
                {isAuth && !loading ? (
                <a href='/' onClick={logout}>
                <FontAwesomeIcon  icon={faSignOutAlt} style={{fontSize: '25px', color: 'white'}}/> 
                <h6 style={{display: 'inline-block', color:'white', marginLeft:'10px', verticalAlign:'center !important'}}>Logout</h6> 
                </a>
                ) : null
                }
            </Navbar>
        </Fragment>
    )
}


export default BlogNavbar
