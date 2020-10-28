import React, {useContext} from 'react'
import AuthContext from '../../context/auth/authContext';
import Dashboard from '../pages/Dashboard';
import Post from './Post';

const Home = () => {
    const authContext = useContext(AuthContext);
    const {user} = authContext;

    useEffect(() => {
        authContext.loadUser()
        
    }, [])
    return (
        <div>
            {user && user.role === 'super_admin' ? <Dashboard /> : <Post />}
        </div>
    )
}

export default Home
