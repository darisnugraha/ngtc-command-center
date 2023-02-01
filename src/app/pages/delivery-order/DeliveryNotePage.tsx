import React, { FC, useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux';
import { ColumnDescription } from 'react-bootstrap-table-next';
import { RootState } from '../../../setup';
import GlobalModal from '../../modules/modal/GlobalModal';
import * as modal from '../../modules/modal/GlobalModalRedux';
import { KTSVG } from '../../../_metronic/helpers';
import DefaultTable from '../../modules/custom-table';
import FormDeliveryNote from './component/FormDeliveryNote';
import FormDetailDeliveryNote from './component/FormDetailDeliveryNote';
import * as redux from './redux/DeliveryNoteRedux';
import FormSendProduct from './component/FormSendProduct';
import FormValidation from './component/FormValidation';

const mapState = (state: RootState) => ({ auth: state.modal });
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const DeliveryNote: FC<PropsFromRedux> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(redux.actions.getDataListOC());
    dispatch(redux.actions.getDataDelivery());
  }, [dispatch]);

  const dataTab: any = useSelector<RootState>(({ deliverynote }) => deliverynote.feedback);

  const [modalType, setModalType] = useState('');

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
      dataField: 'no_order_konfirmasi',
      text: 'No OC',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'no_surat_jalan',
      text: 'No Delivery Order',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'kode_surat_jalan',
      text: 'Delivery Order Code',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'tanggal_surat_jalan',
      text: 'Date',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'nama_toko',
      text: 'Store',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'kode_cabang',
      text: 'Branch',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'nama_customer',
      text: 'Customer Name',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'status',
      text: 'Status',
      align: 'center',
      formatter: (cell) => {
        if (cell === 'OPEN') {
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
        if (cell === 'CANCEL') {
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
      dataField: 'no_surat_jalan',
      text: 'Validation',
      align: 'center',
      formatter: (cell, row) => {
        return (
          <button
            type='button'
            onClick={() => {
              dispatch(redux.actions.showValidation(cell));
              setModalType('VALIDATION');
            }}
            className='btn btn-warning btn-sm me-1'
            disabled={row.status !== 'OPEN'}
          >
            Validation
          </button>
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
          <div className='row'>
            <div className='col-lg-3'>
              <button
                type='button'
                onClick={() => {
                  dispatch(redux.actions.printDeliveryOrder(row.no_surat_jalan));
                }}
                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
              >
                <KTSVG path='/media/icons/duotune/general/gen005.svg' className='svg-icon-3' />
              </button>
            </div>
            <div className='col-lg-3'>
              <button
                type='button'
                onClick={() => {
                  dispatch(redux.actions.getDataDeliveryByNo(row.no_surat_jalan));
                  setModalType('SENDPRODUCT');
                }}
                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                disabled={row.status === 'DONE' || row.status === 'CANCEl' || row.status === 'LOST'}
              >
                <KTSVG path='/media/icons/duotune/general/gen016.svg' className='svg-icon-3' />
              </button>
            </div>
          </div>
        );
      },
    },
  ];

  const handleClick = () => {
    dispatch(modal.actions.show());
    setModalType('ADDDELIVERY');
  };

  const handleClose = () => {
    dispatch(modal.actions.hide());
  };

  const isEdit: any = false;

  const step = useSelector<RootState>(({ deliverynote }) => deliverynote.step);

  return (
    <>
      <GlobalModal
        title={`${
          modalType === 'SENDPRODUCT' ? 'Send Product' : `${isEdit ? 'Edit' : 'Add'} Delivery Order`
        }`}
        onClose={() => handleClose()}
      >
        {
          // eslint-disable-next-line
          modalType === 'VALIDATION' ? (
            <FormValidation
              onSubmit={(data: any) => {
                // eslint-disable-next-line
                console.log(data);
              }}
            />
          ) : // eslint-disable-next-line
          modalType === 'SENDPRODUCT' ? (
            <FormSendProduct
              onSubmit={(data: any) => {
                dispatch(redux.actions.sendProductPost(data));
              }}
            />
          ) : step === 1 ? (
            <FormDeliveryNote
              onSubmit={(data: any) => {
                dispatch(redux.actions.setStepNext(data));
              }}
            />
          ) : (
            <FormDetailDeliveryNote
              onSubmit={(data: any) => {
                dispatch(redux.actions.postDeliveryData(data));
              }}
            />
          )
        }
      </GlobalModal>
      <div className='card mb-5 mb-xl-8'>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>Delivery Order</span>
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
                  onClick={() => handleClick()}
                >
                  <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                  Add Delivery Order
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* begin::Body */}
      </div>
      <DefaultTable className='mb-5 mb-xl-8' data={dataTab} columns={columns} />
    </>
  );
};

export default connector(DeliveryNote);
