import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { I18nProvider } from '../_metronic/i18n/i18nProvider';
import { LayoutProvider, LayoutSplashScreen } from '../_metronic/layout/core';
import AuthInit from './modules/auth/redux/AuthInit';
import Routes from './routing/Routes';

type Props = {
  basename: string;
};

const App = ({ basename }: Props) => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <ToastContainer
        autoClose={2000}
        position='top-right'
        pauseOnHover={false}
        bodyClassName='text-black'
        bodyStyle={{ fontSize: '15px' }}
      />
      <BrowserRouter basename={basename}>
        <I18nProvider>
          <LayoutProvider>
            <AuthInit>
              <Routes />
            </AuthInit>
          </LayoutProvider>
        </I18nProvider>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
