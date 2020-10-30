import React, {useContext} from 'react'
import AuthContext from '../../context/auth/authContext';
import Dashboard from '../pages/Dashboard';
import Post from './Post';

const Home = () => {
    const authContext = useContext(AuthContext);
    const {user} = authContext;

    return (
        <>
            {user && user.role !== 'super_admin' && <Post/>}
            {user && user.role === 'super_admin' && <Dashboard/> }
        </>
    )
}

export default Home
