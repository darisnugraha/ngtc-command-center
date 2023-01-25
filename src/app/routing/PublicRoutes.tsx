import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { LoginPage } from '../pages/auth/LoginPage';

export function PublicRoutes() {
  return (
    <Switch>
      <Route path='/auth' component={LoginPage} />
      <Redirect to='/auth' />
    </Switch>
  );
}
