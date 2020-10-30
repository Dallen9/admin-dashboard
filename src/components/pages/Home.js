import React, {useContext} from 'react'
import AuthContext from '../../context/auth/authContext';
import Dashboard from '../pages/Dashboard';
import Post from './Post';

const Home = () => {
    const authContext = useContext(AuthContext);
    const {user, loading} = authContext;

    return (
        <>
            {user && user.role !== 'super_admin' && !loading && <Post/>}
            {user && user.role === 'super_admin' && !loading && <Dashboard/>}
        </>
    )
}

export default Home
