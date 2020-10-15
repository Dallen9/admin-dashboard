import React, {useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/authContext';
import Dashboard from '../pages/Dashboard';
import BlogNavbar from '../layout/BlogNavbar';
import Post from './Post';

const Home = () => {
    const authContext = useContext(AuthContext);
    const {user} = authContext;

    useEffect(() => {
        authContext.loadUser();
        //eslint-disable-next-line
    }, []);

    return (
        <div>
            <BlogNavbar />
            {user && user.role === 'super_admin' ? <Dashboard /> : <Post />}
        </div>
    )
}

export default Home
