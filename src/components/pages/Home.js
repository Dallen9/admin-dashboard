import React, {useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/authContext';
import Dashboard from '../pages/Dashboard';
import Post from './Post';

const Home = () => {
    const authContext = useContext(AuthContext);
    const {user, loading} = authContext;

    useEffect(() => {
        authContext.loadUser()
    }, [loading])
    return (
        <div>
            {user && user.role === 'super_admin' && !loading ? <Dashboard /> : <Post />}
        </div>
    )
}

export default Home
