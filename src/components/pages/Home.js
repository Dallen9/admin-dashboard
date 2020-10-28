import React, {useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/authContext';
import AdminContext from '../../context/admin/adminContext';
import Dashboard from '../pages/Dashboard';
import Post from './Post';

const Home = () => {
    const authContext = useContext(AuthContext);
    const {user, isAuth, loading} = authContext;
    useEffect(() => {
       if(!user && isAuth) {
        authContext.loadUser()

       }
       
        
    }, [authContext, user, isAuth])

    return (
        <>
            {user && user.role === 'super_admin' && <Dashboard /> }
            {user && user.role !== 'super_admin' && <Post />}
        </>
    )
}

export default Home
