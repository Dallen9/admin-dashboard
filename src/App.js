import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/routes/PrivateRoute';
import Home from './components/pages/Home';
import AuthState from './context/auth/AuthState';

function App() {
 
  return (
    <AuthState>
    <Router>
      <Fragment>
        <div className="App">
          <Switch>
            <PrivateRoute exact path='/' component={Home} />
            <Route exact path='/register' component={Register}/>
            <Route exact path='/login' component={Login}/>
          </Switch>
        </div>
      </Fragment>
    </Router>
    </AuthState>
   
  
  );
}

export default App;
