/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/destructuring-assignment */
import React, { FC, useEffect, useState } from 'react';
import { shallowEqual, useSelector, connect, useDispatch, ConnectedProps } from 'react-redux';
import { LayoutSplashScreen } from '../../../../_metronic/layout/core';
import * as authAction from '../../../pages/auth/redux/LoginRedux';
import { RootState } from '../../../../setup';

const mapState = (state: RootState) => ({ auth: state.auth });
const connector = connect(mapState, authAction);
type PropsFromRedux = ConnectedProps<typeof connector>;

const AuthInit: FC<PropsFromRedux> = (props) => {
  const dispatch = useDispatch();
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const accessToken = useSelector<RootState>(({ auth }) => auth.isLogin, shallowEqual);

  // We should request user by authToken before rendering the application
  useEffect(() => {
    const requestUser = async () => {
      dispatch(authAction.actions.isLogin());
      setShowSplashScreen(false);
    };

    if (!accessToken) {
      requestUser();
    } else {
      setShowSplashScreen(false);
    }
    // eslint-disable-next-line
  }, []);

  return showSplashScreen ? <LayoutSplashScreen /> : <>{props.children}</>;
};

export default connector(AuthInit);
