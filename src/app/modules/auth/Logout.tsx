import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';

export const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    document.location.reload();
  }, [dispatch]);

  return (
    <Switch>
      <Redirect to='/auth/login' />
    </Switch>
  );
};
