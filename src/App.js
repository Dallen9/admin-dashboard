import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
function App() {
  return (
    <div className="App">
      {/* <Register /> */}
      <Login />
    </div>
  );
}

export default App;
