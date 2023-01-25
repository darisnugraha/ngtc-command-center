import React, { FC } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { ColumnDescription } from 'react-bootstrap-table-next';
import { RootState } from '../../../../setup';
import GlobalModal from '../../../modules/modal/GlobalModal';
import * as modal from '../../../modules/modal/GlobalModalRedux';
import FormUserComponent from './component/FormUserComponent';
import { KTSVG } from '../../../../_metronic/helpers';
import DefaultTable from '../../../modules/custom-table';
import * as redux from './redux/UserRedux';

const mapState = (state: RootState) => ({ auth: state.modal });
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const UserPage: FC<PropsFromRedux> = () => {
  const dispatch = useDispatch();
  const columns: ColumnDescription[] = [
    {
      dataField: 'no',
      text: 'No',
      headerClasses: 'ps-4 min-w-100px rounded-start',
      formatter: (cell) => {
        return (
          <p className='ps-4 text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>{cell}</p>
        );
      },
    },
    {
      dataField: 'user_id',
      text: 'User Id',
      formatter: (cell) => {
        return <p className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'user_name',
      text: 'Username',
      formatter: (cell) => {
        return <p className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'password',
      text: 'Password',
      formatter: (cell) => {
        return <p className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'level',
      text: 'Level',
      formatter: (cell) => {
        return <p className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: '',
      text: 'Action',
      headerClasses: 'ps-4 min-w-100px rounded-end',
      formatter: () => {
        return (
          <>
            <button
              type='button'
              onClick={() => {}}
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
            >
              <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
            </button>
            <button
              type='button'
              onClick={() => {}}
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
            >
              <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
            </button>
          </>
        );
      },
    },
  ];

  const handleClickUser = () => {
    dispatch(modal.actions.show());
  };

  const handleCloseUser = () => {
    dispatch(modal.actions.hide());
  };

  return (
    <>
      <GlobalModal title='Add User' onClose={() => handleCloseUser()}>
        <FormUserComponent
          onSubmit={(data: any) => {
            dispatch(redux.actions.addUser(data));
          }}
        />
      </GlobalModal>
      <div className='card mb-5 mb-xl-8'>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>Master User</span>
            {/* <span className='text-muted mt-1 fw-bold fs-7'>{subtitle}</span> */}
          </h3>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
          <div className='row'>
            <div className='col-lg-6'>
              <div className='w-100 position-relative mb-3'>
                <KTSVG
                  path='/media/icons/duotune/general/gen021.svg'
                  className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 translate-middle-y ms-4'
                />
                <input
                  type='text'
                  className='form-control form-control-solid ps-15'
                  name='search'
                  placeholder='Search...'
                  data-kt-search-element='input'
                />
              </div>
            </div>
            <div className='col-lg-6'>
              <div style={{ float: 'right' }}>
                <button
                  type='button'
                  className='btn btn-sm btn-light-primary'
                  onClick={() => handleClickUser()}
                >
                  <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* begin::Body */}
      </div>
      <DefaultTable className='mb-5 mb-xl-8' data={[]} columns={columns} />
    </>
  );
};

export default connector(UserPage);
