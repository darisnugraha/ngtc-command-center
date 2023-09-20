import React, { FC, useEffect } from 'react';
import { ColumnDescription } from 'react-bootstrap-table-next';
import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux';
import { Image } from 'react-bootstrap-v5';
import { RootState } from '../../../setup';
import { KTSVG } from '../../../_metronic/helpers';
import DefaultTable from '../../modules/custom-table';
import * as redux from './redux/ValidationPaymentRedux';
import * as modalSecond from '../../modules/modal/ModalSecondRedux';
import ModalSecond from '../../modules/modal/ModalSecond';

const mapState = (state: RootState) => ({ auth: state.modal });
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ValidationPayment: FC<PropsFromRedux> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(redux.actions.getListPaymentOC());
    dispatch(redux.actions.getListPaymentOCDP());
    dispatch(redux.actions.getListBank());
  }, [dispatch]);

  const isLoading = useSelector<RootState, boolean>(({ utility }) => utility.isLoadingButton);

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
          <div className='row'>
            <div className='col-lg-12 mb-2'>
              <button
                type='button'
                onClick={() => {
                  // eslint-disable-next-line
                  dispatch(redux.actions.getBuktiBayar(row.no_piutang));
                }}
                className='btn btn-bg-light btn-active-color-primary btn-sm me-1'
                disabled={isLoading}
              >
                {isLoading ? (
                  <span
                    className='spinner-border spinner-border-sm'
                    style={{ marginRight: '10px' }}
                    role='status'
                    aria-hidden='true'
                  />
                ) : null}
                Proof Of Payment{' '}
                <KTSVG path='/media/icons/duotune/finance/fin002.svg' className='svg-icon-3' />
              </button>
            </div>
            <div className='col-lg-12'>
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
            </div>
          </div>
        );
      },
    },
  ];

  const dataTabDP: any = useSelector<RootState>(
    ({ validationpayment }) => validationpayment.feedbackDP
  );

  const handleCloseModal = () => {
    dispatch(modalSecond.actions.hide());
  };

  const dataGambar: any = useSelector<RootState>(
    ({ validationpayment }) => validationpayment.proofOfPaymentIMG
  );

  return (
    <>
      <ModalSecond title='Proof Of Payment' onClose={() => handleCloseModal()}>
        <Image src={dataGambar} fluid />
      </ModalSecond>
      <div className='card mb-5 mb-xl-8'>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>Validation Payment</span>
          </h3>
        </div>
      </div>
      <DefaultTable className='mb-5 mb-xl-8' data={dataTabDP} columns={columnsDP} />
    </>
  );
};

export default connector(ValidationPayment);
