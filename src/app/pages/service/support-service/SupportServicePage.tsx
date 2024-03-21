import React, { FC, useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux';
import { ColumnDescription } from 'react-bootstrap-table-next';
import { RootState } from '../../../../setup';
import GlobalModal from '../../../modules/modal/GlobalModal';
import { KTSVG } from '../../../../_metronic/helpers';
import DefaultTable from '../../../modules/custom-table';
import * as modal from '../../../modules/modal/GlobalModalRedux';
import * as redux from './redux/SupportServiceRedux';
import * as reduxStore from '../../master/customer/redux/CustomerRedux';
import * as reduxUnit from '../../master/unit/redux/UnitRedux';
import FormSupportService from './component/FormSupportService';
import { manipulatePriceData } from '../../../../setup/function.js';

const mapState = (state: RootState) => ({ auth: state.modal });
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const SupportServicePage: FC<PropsFromRedux> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(redux.actions.getSupportService());
    dispatch(reduxStore.actions.getStore());
    dispatch(reduxUnit.actions.getUnit());
  }, [dispatch]);

  const dataTab: any = useSelector<RootState>(({ supportservice }) => supportservice.feedback);
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
      dataField: 'no_support_service',
      text: 'Support Service Code',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'nama_support_service',
      text: 'Support Service Name',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'kode_toko',
      text: 'Store Code',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'kode_cabang',
      text: 'Branch Code',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'qty',
      text: 'Qty',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'kode_satuan',
      text: 'Unit',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'harga',
      text: 'Price',
      align: 'right',
      formatter: manipulatePriceData,
    },
    {
      dataField: 'total_harga',
      text: 'Subtotal',
      align: 'right',
      formatter: manipulatePriceData,
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
              onClick={() => {
                // eslint-disable-next-line
                dispatch(redux.actions.getSupportServiceByID(row._id));
              }}
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
            >
              <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
            </button>
            <button
              type='button'
              onClick={() => {
                // eslint-disable-next-line
                dispatch(redux.actions.deleteSupportService(row._id));
              }}
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
            >
              <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
            </button>
          </>
        );
      },
    },
  ];

  const handleClickSupportService = () => {
    dispatch(modal.actions.show());
  };

  const handleCloseSupportService = () => {
    dispatch(redux.actions.closeModal());
  };

  const isEdit: any = useSelector<RootState>(({ supportservice }) => supportservice.isEdit);

  return (
    <>
      <GlobalModal
        title={`${isEdit ? 'Edit' : 'Add'} Support Service`}
        onClose={() => handleCloseSupportService()}
      >
        <FormSupportService
          onSubmit={(data: any) => {
            if (isEdit) {
              dispatch(redux.actions.updateSupportService(data));
            } else {
              dispatch(redux.actions.addSupportService(data));
            }
          }}
        />
      </GlobalModal>
      <div className='card mb-5 mb-xl-8'>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>List Support Service</span>
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
                        entry.nama_support_service
                          ?.toUpperCase()
                          .includes(currValue?.toUpperCase()) ||
                        entry.no_support_service
                          ?.toUpperCase()
                          .includes(currValue?.toUpperCase()) ||
                        entry.kode_toko?.toUpperCase().includes(currValue?.toUpperCase()) ||
                        entry.kode_satuan?.toUpperCase().includes(currValue?.toUpperCase()) ||
                        entry.qty?.toString()?.toUpperCase().includes(currValue?.toUpperCase()) ||
                        entry.harga?.toString()?.toUpperCase().includes(currValue?.toUpperCase()) ||
                        entry.total_harga
                          ?.toString()
                          ?.toUpperCase()
                          .includes(currValue?.toUpperCase()) ||
                        entry.kode_cabang?.toUpperCase().includes(currValue?.toUpperCase())
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
                  onClick={() => handleClickSupportService()}
                >
                  <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                  Add Support Service
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

export default connector(SupportServicePage);
