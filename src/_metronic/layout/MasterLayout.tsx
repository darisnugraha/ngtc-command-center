import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AsideDefault from './components/aside/AsideDefault';
import { Footer } from './components/Footer';
import HeaderWrapper from './components/header/HeaderWrapper';
import { ScrollTop } from './components/ScrollTop';
import { Content } from './components/Content';
import { PageDataProvider } from './core';
import {
  DrawerMessenger,
  ActivityDrawer,
  Main,
  InviteUsers,
  UpgradePlan,
  FallbackView,
} from '../partials';
import { MenuComponent } from '../assets/ts/components';
import { ToastContainer } from 'react-toastify';
const MasterLayout: React.FC = function ({ children }) {
  const location = useLocation();
  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization();
    }, 500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization();
    }, 500);
  }, [location.key]);

  return (
    <PageDataProvider>
      <FallbackView />
      <div className='page d-flex flex-row flex-column-fluid'>
        <AsideDefault />
        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <HeaderWrapper />

          <div id='kt_content' className='content d-flex flex-column flex-column-fluid'>
            <div className='post d-flex flex-column-fluid' id='kt_post'>
              <Content>{children}</Content>
            </div>
          </div>
          <Footer />
        </div>
      </div>

      {/* begin:: Drawers */}
      <ActivityDrawer />
      {/* <ExploreMain /> */}
      <DrawerMessenger />
      {/* end:: Drawers */}

      {/* begin:: Modals */}
      <Main />
      <InviteUsers />
      <UpgradePlan />
      {/* end:: Modals */}
      <ScrollTop />
    </PageDataProvider>
  );
};

export default MasterLayout;
