import React, { FC, useEffect, useState } from 'react';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import { Tab, Tabs } from 'react-bootstrap-v5';
import { RootState } from '../../../../setup';
// import { KTSVG } from '../../../../_metronic/helpers';
import FormSearchOC from './component/FormSearchSO';
import * as reduxStaff from '../../master/staff/redux/StaffRedux';
import * as reduxCustomer from '../../master/customer/redux/CustomerRedux';
import * as redux from './redux/ListSORedux';
import GlobalModal from '../../../modules/modal/GlobalModal';
import * as modal from '../../../modules/modal/GlobalModalRedux';
import DetailOC from './component/DetailSO';
import ImplementationSO from './component/ImplementationSO';

const mapState = (state: RootState) => ({ auth: state.modal });
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ListSalesOrder: FC<PropsFromRedux> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reduxStaff.actions.getStaff());
    dispatch(reduxCustomer.actions.getStore());
    dispatch(redux.actions.getListSO());
    dispatch(redux.actions.getDataListSO());
  }, [dispatch]);

  const dataTab: any = useSelector<RootState>(({ listso }) => listso.feedback);

  const [typeModal, setTypeModal] = useState('');

  const handleCloseModal = () => {
    dispatch(modal.actions.hide());
  };

  const columns: ColumnDescription[] = [
    {
      dataField: 'key',
      text: 'No',
      align: 'center',
      headerClasses: 'ps-4 min-w-100px rounded-start',
      formatter: (cell) => {
        return <p className='ps-4 text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
      },
    },
    {
      dataField: 'no_sales_order',
      text: 'No Sales Order',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
      },
    },
    {
      dataField: 'no_order_konfirmasi',
      text: 'No Order Confirmation',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
      },
    },
    {
      dataField: 'tanggal_order_konfirmasi',
      text: 'Date',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
      },
    },
    {
      dataField: 'jenis_ok',
      text: 'Type',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
      },
    },
    {
      dataField: 'kode_toko',
      text: 'Central Store Code',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
      },
    },
    {
      dataField: 'nama_toko',
      text: 'Central Store Name',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
      },
    },
    {
      dataField: 'total_harga',
      text: 'Total Price',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>Rp. {cell?.toLocaleString()}</p>;
      },
    },
    {
      dataField: 'status',
      text: 'Status',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
      },
    },
    {
      dataField: 'status_implementasi',
      text: 'Implementation Status',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: '',
      text: 'Action',
      align: 'center',
      headerClasses: 'ps-4 min-w-100px rounded-end',
      formatter: (cell, row) => {
        return (
          <button
            type='button'
            onClick={() => {
              dispatch(redux.actions.getListSOByNo(row.no_order_konfirmasi));
              setTypeModal('DETAIL');
            }}
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
          >
            <i className='bi bi-eye-fill' />
          </button>
          // <div className='row'>
          //   <div className='col-lg-4'>
          //     <button
          //       type='button'
          //       onClick={() => {
          //         dispatch(redux.actions.getListSOByNo(row.no_order_konfirmasi));
          //         setTypeModal('DETAIL');
          //       }}
          //       className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
          //     >
          //       <i className='bi bi-eye-fill' />
          //     </button>
          //   </div>
          //   <div className='col-lg-4 d-none'>
          //     <button
          //       type='button'
          //       onClick={() => {
          //         // eslint-disable-next-line
          //       }}
          //       className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
          //     >
          //       <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
          //     </button>
          //   </div>
          //   <div className='col-lg-4 d-none'>
          //     <button
          //       type='button'
          //       onClick={() => {
          //         // eslint-disable-next-line
          //         dispatch(redux.actions.deleteSO(row._id));
          //       }}
          //       className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
          //     >
          //       <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
          //     </button>
          //   </div>
          // </div>
        );
      },
    },
  ];

  return (
    <>
      <GlobalModal
        title={typeModal === 'DETAIL' ? 'DETAIL SALES ORDER' : 'TITLE'}
        onClose={() => handleCloseModal()}
        typeModal={typeModal}
      >
        {typeModal === 'DETAIL' ? (
          <Tabs defaultActiveKey='detail' id='uncontrolled-tab-example' className='mb-3'>
            <Tab eventKey='detail' title='Detail'>
              <DetailOC />
            </Tab>
            <Tab eventKey='implementation' title='Implementation'>
              <ImplementationSO />
            </Tab>
          </Tabs>
        ) : (
          <DetailOC />
        )}
      </GlobalModal>
      <div className='card mb-5 mb-xl-8'>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>List Sales Order</span>
            {/* <span className='text-muted mt-1 fw-bold fs-7'>{subtitle}</span> */}
          </h3>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        {/* <div className='card-body py-3'></div> */}
        {/* begin::Body */}
      </div>
      <div className='card mb-5 mb-xl-8'>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <FormSearchOC
            onSubmit={(data: any) => {
              dispatch(redux.actions.searchSO(data));
            }}
          />
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
          <hr />
          <BootstrapTable
            keyField='_id'
            columns={columns}
            data={dataTab}
            wrapperClasses='table-responsive'
            classes='table align-middle gs-0 gy-4'
            headerClasses='fw-bolder text-center'
            rowStyle={{ borderBottom: '1pt solid black' }}
            noDataIndication={() => {
              return (
                <div className='row'>
                  <div className='col-lg-12' style={{ textAlign: 'center' }}>
                    No Data
                  </div>
                </div>
              );
            }}
            hover
            pagination={paginationFactory({})}
          />
        </div>
        {/* begin::Body */}
      </div>
    </>
  );
};

export default connector(ListSalesOrder);
