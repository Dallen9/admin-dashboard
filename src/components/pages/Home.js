import React, {useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/authContext';
import Dashboard from '../pages/Dashboard';

const Home = () => {
    const authContext = useContext(AuthContext);
    const {user} = authContext;

    useEffect(() => {
        authContext.loadUser();
        //eslint-disable-next-line
    }, []);

    return (
        <div>
            {user && user.role === 'super_admin' ? <Dashboard /> : <h1>bye</h1>}
        </div>
    )
}

export default Home
