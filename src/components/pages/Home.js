import React, {useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/authContext';
import Dashboard from '../pages/Dashboard';
import {Button} from 'react-bootstrap'

const Home = () => {
    const authContext = useContext(AuthContext);
    const {user, logout} = authContext;

    useEffect(() => {
        authContext.loadUser();
        //eslint-disable-next-line
    }, []);

    return (
        <div>
            {user && user.role === 'super_admin' ? <Dashboard /> : <Button variant='primary' onClick={logout}>logout</Button>}
        </div>
    )
}

export default Home
