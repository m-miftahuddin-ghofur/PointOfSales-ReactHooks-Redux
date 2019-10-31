import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';

import Login from './User.js/Login';
import Register from './User.js/Register';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <div className="App">
      <div className="row">
          <Route exact path='/' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/dashboard' component={Dashboard}/>
      </div>
    </div>
  );
}

export default App;
