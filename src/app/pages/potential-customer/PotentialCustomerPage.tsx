import React, { FC, useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux';
import { ColumnDescription } from 'react-bootstrap-table-next';
import { RootState } from '../../../setup';
import GlobalModal from '../../modules/modal/GlobalModal';
import { KTSVG } from '../../../_metronic/helpers';
import DefaultTable from '../../modules/custom-table';
import * as redux from './redux/PotentialCustomerRedux';
import * as reduxStore from '../master/customer/redux/CustomerRedux';
import * as modal from '../../modules/modal/GlobalModalRedux';
import FormPotentialCustomer from './component/FormPotentialCustomer';

const mapState = (state: RootState) => ({ auth: state.modal });
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const PotentialCustomerPage: FC<PropsFromRedux> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(redux.actions.getPotentialCustomer());
    dispatch(reduxStore.actions.getStore());
  }, [dispatch]);

  const dataTab: any = useSelector<RootState>(
    ({ potentialcustomer }) => potentialcustomer.feedback
  );
  const [dataSource, setDataSource] = useState(dataTab);
  const [value, setValue] = useState('');
  const [search, setSearch] = useState(false);

  // eslint-disable-next-line
  const dataTable = dataSource.length === 0 ? (search ? dataSource : dataTab) : dataSource;

  const columns: ColumnDescription[] = [
    {
      dataField: 'key',
      text: 'No',
      align: 'center',
      headerClasses: 'ps-4 min-w-100px rounded-start',
      formatter: (cell) => {
        return <p className='ps-4 text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'no_calon_customer',
      text: 'No Potential Customer',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'nama_toko',
      text: 'Store Name',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'alamat',
      text: 'Address',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'kota',
      text: 'City',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'telepon',
      text: 'Telephone',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'email',
      text: 'Email',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'tipe_toko',
      text: 'Store Type',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
      },
    },
    {
      dataField: 'status',
      text: 'Status',
      align: 'center',
      formatter: (cell) => {
        if (cell === 'FOLLOW UP') {
          return (
            <span className='btn btn-outline btn-outline-primary btn-active-light-primary'>
              {cell}
            </span>
          );
        }
        if (cell === 'DONE') {
          return (
            <span className='btn btn-outline btn-outline-success btn-active-light-success'>
              {cell}
            </span>
          );
        }
        if (cell === 'CLOSE') {
          return (
            <span className='btn btn-outline btn-outline-danger btn-active-light-danger'>
              {cell}
            </span>
          );
        }
        return (
          <span className='btn btn-outline btn-outline-warning btn-active-light-warning'>
            {cell}
          </span>
        );
      },
    },
    {
      dataField: '',
      text: 'Action',
      align: 'center',
      headerClasses: 'ps-4 min-w-100px rounded-end',
      formatter: (cell, row) => {
        return (
          <>
            <button
              type='button'
              onClick={() => {}}
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 d-none'
            >
              <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
            </button>
            <button
              type='button'
              onClick={() => {
                dispatch(redux.actions.handleValidation(row.no_calon_customer));
              }}
              className='btn btn-sm btn-success'
              // eslint-disable-next-line
              disabled={row.status === 'DONE' ? true : false}
            >
              <span className='svg-icon svg-icon-1'>
                <KTSVG path='/media/icons/duotune/general/gen043.svg' />
              </span>
              Validation
            </button>
          </>
        );
      },
    },
  ];

  const handleClickPotentialCustomer = () => {
    dispatch(modal.actions.show());
  };

  const handleClosePotentialCustomer = () => {
    dispatch(redux.actions.closeModal());
  };

  const isEdit: any = false;

  return (
    <>
      <GlobalModal
        title={`${isEdit ? 'Edit' : 'Add'} Potential Customer`}
        onClose={() => handleClosePotentialCustomer()}
      >
        <FormPotentialCustomer
          onSubmit={(data: any) => {
            dispatch(redux.actions.addPotentialCustomer(data));
          }}
        />
      </GlobalModal>
      <div className='card mb-5 mb-xl-8'>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>List of Potential Customer</span>
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
                  value={value}
                  onChange={(e) => {
                    const currValue = e.target.value;

                    setValue(currValue);
                    const filteredData = dataTab.filter(
                      (entry: any) =>
                        entry.no_calon_customer?.toUpperCase().includes(currValue?.toUpperCase()) ||
                        entry.nama_toko?.toUpperCase().includes(currValue?.toUpperCase()) ||
                        entry.alamat?.toUpperCase().includes(currValue?.toUpperCase()) ||
                        entry.alamat_korespondensi
                          ?.toUpperCase()
                          .includes(currValue?.toUpperCase()) ||
                        entry.kota?.toUpperCase().includes(currValue?.toUpperCase()) ||
                        entry.telepon?.toUpperCase().includes(currValue?.toUpperCase()) ||
                        entry.email?.toUpperCase().includes(currValue?.toUpperCase()) ||
                        entry.tipe_toko?.toUpperCase().includes(currValue?.toUpperCase()) ||
                        entry.status?.toUpperCase().includes(currValue?.toUpperCase())
                    );
                    setDataSource(filteredData);
                    setSearch(true);
                  }}
                />
              </div>
            </div>
            <div className='col-lg-6'>
              <div style={{ float: 'right' }}>
                <button
                  type='button'
                  className='btn btn-sm btn-light-primary'
                  onClick={() => handleClickPotentialCustomer()}
                >
                  <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                  Add Potential Customer
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* begin::Body */}
      </div>
      <DefaultTable className='mb-5 mb-xl-8' data={dataTable} columns={columns} />
    </>
  );
};

export default connector(PotentialCustomerPage);
