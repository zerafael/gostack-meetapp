import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Detail from '../pages/Detail';
import Edit from '../pages/Edit';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" exact component={SignUp} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/detail/:id" component={Detail} isPrivate />
      <Route path="/edit/:id" component={Edit} isPrivate />
      <Route path="/new" component={Edit} isPrivate />
    </Switch>
  );
}

export default Routes;
