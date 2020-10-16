import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/routes/PrivateRoute';
import Home from './components/pages/Home';
import Post from './components/pages/Post';
import PostDetail from './components/pages/PostDetail';
import AuthState from './context/auth/AuthState';
import AdminState from './context/admin/AdminState';
import PostState from './context/post/PostState';
import BlogNavbar from './components/layout/BlogNavbar';

function App() {
  return (
    <AuthState>
      <AdminState>
        <PostState>
          <Router >
          <BlogNavbar />
            <Fragment>
              <div className="App">
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <PrivateRoute exact path='/blog' component={Post}/>
                  <PrivateRoute exact path='/detail' component={PostDetail}/>
                  <Route exact path='/register' component={Register}/>
                  <Route exact path='/login' component={Login}/>
                </Switch>
              </div>
            </Fragment>
          </Router>
        </PostState>
      </AdminState>
    </AuthState>
   
  
  );
}

export default App;
