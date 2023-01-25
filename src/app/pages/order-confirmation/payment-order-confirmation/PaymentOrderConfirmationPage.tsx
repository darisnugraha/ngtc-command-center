import React, { FC, useEffect } from 'react';
import { ColumnDescription } from 'react-bootstrap-table-next';
import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux';
import { Image } from 'react-bootstrap-v5';
import { RootState } from '../../../../setup';
import { KTSVG } from '../../../../_metronic/helpers';
import DefaultTable from '../../../modules/custom-table';
import GlobalModal from '../../../modules/modal/GlobalModal';
import FormPembayaranOC from './component/FormPembayaranOC';
import * as redux from './redux/PaymentOrderConfirmationRedux';
import * as modal from '../../../modules/modal/GlobalModalRedux';
import * as modalSecond from '../../../modules/modal/ModalSecondRedux';
import ModalSecond from '../../../modules/modal/ModalSecond';

const mapState = (state: RootState) => ({ auth: state.modal });
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const PaymentOrderConfirmationPage: FC<PropsFromRedux> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(redux.actions.getListPaymentOC());
    dispatch(redux.actions.getListPaymentOCDP());
    dispatch(redux.actions.getListBank());
  }, [dispatch]);

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
    // {
    //   dataField: 'status',
    //   text: 'Status Payment',
    //   align: 'center',
    //   formatter: (cell) => {
    //     return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
    //   },
    // },
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
                dispatch(redux.actions.showModalPaymentOC(row.no_order_konfirmasi));
              }}
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
            >
              <KTSVG path='/media/icons/duotune/finance/fin002.svg' className='svg-icon-3' />
            </button>
            <button
              type='button'
              onClick={() => {
                // eslint-disable-next-line
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

  const columnsDP: ColumnDescription[] = [
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
      dataField: 'no_order_konfirmasi',
      text: 'No Order Confirmation',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
      },
    },
    {
      dataField: 'tanggal_order_konfirmasi',
      text: 'Date Order',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
      },
    },
    {
      dataField: 'no_piutang',
      text: 'No Receivable',
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
      dataField: 'bayar_rp',
      text: 'Pay Amount',
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
    // {
    //   dataField: 'status',
    //   text: 'Status Payment',
    //   align: 'center',
    //   formatter: (cell) => {
    //     return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
    //   },
    // },
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
                dispatch(redux.actions.getBuktiBayar(row.no_piutang));
              }}
              className='btn btn-bg-light btn-active-color-primary btn-sm me-1'
            >
              Proof Of Payment{' '}
              <KTSVG path='/media/icons/duotune/finance/fin002.svg' className='svg-icon-3' />
            </button>
            <button
              type='button'
              onClick={() => {
                // eslint-disable-next-line
                dispatch(redux.actions.validationPayment(row.no_piutang));
              }}
              className='btn btn-bg-light btn-active-color-success btn-sm me-1'
            >
              Validation{' '}
              <KTSVG path='/media/icons/duotune/arrows/arr016.svg' className='svg-icon-3' />
            </button>
          </>
        );
      },
    },
  ];

  const dataTab: any = useSelector<RootState>(
    ({ paymentorderconfirmation }) => paymentorderconfirmation.feedback
  );
  const dataTabDP: any = useSelector<RootState>(
    ({ paymentorderconfirmation }) => paymentorderconfirmation.feedbackDP
  );

  const handleClose = () => {
    dispatch(modal.actions.hide());
  };

  const handleCloseModal = () => {
    dispatch(modalSecond.actions.hide());
  };

  const dataGambar: any = useSelector<RootState>(
    ({ paymentorderconfirmation }) => paymentorderconfirmation.proofOfPaymentIMG
  );

  return (
    <>
      <ModalSecond title='Proof Of Payment' onClose={() => handleCloseModal()}>
        <Image src={dataGambar} />
      </ModalSecond>
      <GlobalModal title='Payment Order Confirmation' onClose={() => handleClose()}>
        <FormPembayaranOC
          onSubmit={(data: any) => {
            // eslint-disable-next-line
            dispatch(redux.actions.addPayment(data));
          }}
        />
      </GlobalModal>
      <div className='card mb-5 mb-xl-8'>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>Payment Order Confirmation</span>
          </h3>
        </div>
      </div>
      <DefaultTable className='mb-5 mb-xl-8' data={dataTab} columns={columns} />
      <DefaultTable className='mb-5 mb-xl-8' data={dataTabDP} columns={columnsDP} />
    </>
  );
};

export default connector(PaymentOrderConfirmationPage);
