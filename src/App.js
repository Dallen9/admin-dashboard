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
import Profile from './components/pages/Profile';
import NewPost from './components/pages/NewPost';
import UserPost from './components/pages/UserPost';
import Account from './components/pages/Account';
import EditPost  from './components/pages/EditPost'
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
function App() {
  return (
    <AuthState>
      <AdminState>
        <PostState>
          <Router >
          <BlogNavbar />
              <Fragment >
              <div className="App">
                <Switch>
                  <Route exact path='/' component={Login} />
                  <PrivateRoute exact path='/blog' component={Post}/>
                  <PrivateRoute exact path='/home' component={Home}/>
                  <PrivateRoute exact path='/detail/:id' component={PostDetail}/>
                  <PrivateRoute exact path='/profile' component={Profile} />
                  <PrivateRoute exact path='/account' component={Account} />
                  <PrivateRoute exact path='/create-post' component={NewPost} />
                  <PrivateRoute exact path='/user-posts' component={UserPost} />
                  <PrivateRoute exact path='/user-posts/:id' component={EditPost} />
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
