import React, { FC } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import MasterLayout from '../../_metronic/layout/MasterLayout';
import { PrivateRoutes } from './PrivateRoutes';
import { Logout } from '../modules/auth';
import { ErrorsPage } from '../modules/errors/ErrorsPage';
import { RootState } from '../../setup';
import { MasterInit } from '../../_metronic/layout/MasterInit';
import { LoginPage } from '../pages/auth/LoginPage';

const Routes: FC = () => {
  const isAuthorized = useSelector<RootState>(({ auth }) => auth.isLogin, shallowEqual);
  // const isAuthorized = true;

  return (
    <>
      <Switch>
        {!isAuthorized ? (
          <Route>
            <LoginPage />
          </Route>
        ) : (
          <Redirect from='/auth' to='/' />
        )}

        <Route path='/error' component={ErrorsPage} />
        <Route path='/logout' component={Logout} />

        {!isAuthorized ? (
          <Redirect to='/auth/login' />
        ) : (
          <MasterLayout>
            <PrivateRoutes />
          </MasterLayout>
        )}
      </Switch>
      <MasterInit />
    </>
  );
};

export default Routes;
