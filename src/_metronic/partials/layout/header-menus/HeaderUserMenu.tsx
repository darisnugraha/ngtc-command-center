import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Languages } from './Languages';
import * as auth from '../../../../app/pages/auth/redux/LoginRedux';
import { toAbsoluteUrl } from '../../../helpers';

const HeaderUserMenu: FC = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(auth.actions.logout());
  };

  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <img alt='Logo' src={toAbsoluteUrl('/media/avatars/blank.png')} />
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              ADMIN
              {/* <span className='badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2'>Pro</span> */}
            </div>
            {/* <p className='fw-bold text-muted text-hover-primary fs-7'>EMAIL@EMAIL.COM</p> */}
          </div>
        </div>
      </div>

      <div className='separator my-2' />

      <div className='menu-item px-5'>
        <a onClick={logout} className='menu-link px-5'>
          Sign Out
        </a>
      </div>
    </div>
  );
};

export default HeaderUserMenu;
