import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({component: Component, ...rest}) => {
    const authContext = useContext(AuthContext);

    const {loading, token} = authContext;

    return (
        <Route 
        {...rest}
        render={ props  =>
            !token && !loading ? (
                <Redirect to ='/login'/>
            ) : (
                <Component {...props} />
            )}
        />   
    )
}

export default PrivateRoute
