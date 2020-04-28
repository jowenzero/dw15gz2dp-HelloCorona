import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
//import DoctorRoute from './routes/DoctorRoute';
//import UserRoute from './routes/UserRoute';

import './styles/App.css';

import Home from './pages/home';
import Profile from './pages/profile';
import NotFound from './pages/not_found';

const App = () => (
  <Router>
    <Switch>  
      <PrivateRoute path="/profile" exact component={Profile}/>
      <Route path="/" exact component={Home}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>
)

export default App;
