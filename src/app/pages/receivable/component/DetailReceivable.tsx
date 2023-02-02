import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import { Image } from 'react-bootstrap-v5';
import { RootState } from '../../../../setup';
import { KTSVG } from '../../../../_metronic/helpers';
import ModalSecond from '../../../modules/modal/ModalSecond';
import * as modal from '../../../modules/modal/ModalSecondRedux';
import * as redux from '../redux/ReceivableRedux';

const DetailReceivable: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  const dataTab: any = useSelector<RootState>(({ receivable }) => receivable.feedbackDetail);

  const columns: ColumnDescription[] = [
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
      dataField: 'kode_cabang',
      text: 'Branch Store Code',
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
      dataField: 'total_tagihan',
      text: 'Total Bill',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>Rp. {cell?.toLocaleString()}</p>;
      },
    },
    {
      dataField: 'sisa_tagihan',
      text: 'Rest Bill',
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
      dataField: '',
      text: 'Action',
      align: 'center',
      headerClasses: 'ps-4 min-w-100px rounded-end',
      formatter: (cell, row) => {
        return (
          <div className='row'>
            <div className='col-lg-6'>
              <button
                type='button'
                onClick={() => {
                  // eslint-disable-next-line
                  dispatch(redux.actions.getBuktiBayar(row.no_piutang));
                }}
                className='btn btn-bg-light btn-active-color-primary btn-sm me-1'
                disabled={row.bayar_rp === 0}
              >
                Bukti Bayar{' '}
                <KTSVG path='/media/icons/duotune/finance/fin002.svg' className='svg-icon-3' />
              </button>
            </div>
            <div className='col-lg-6'>
              <button
                type='button'
                onClick={() => {
                  // eslint-disable-next-line
                  dispatch(redux.actions.printReceiptPDF(row.no_piutang));
                }}
                className='btn btn-bg-light btn-active-color-primary btn-sm me-1'
                disabled={row.bayar_rp === 0}
              >
                Print Receipt
                <KTSVG path='/media/icons/duotune/files/fil004.svg' className='svg-icon-3' />
              </button>
            </div>
          </div>
        );
      },
    },
  ];

  const handleCloseModal = () => {
    dispatch(modal.actions.hide());
  };

  const img: any = useSelector<RootState>(({ receivable }) => receivable.proofOfPaymentIMG);

  return (
    <>
      <ModalSecond title='Proof Of Payment' onClose={() => handleCloseModal()}>
        <Image src={img} fluid />
      </ModalSecond>
      <BootstrapTable
        keyField='_id'
        columns={columns}
        data={dataTab}
        wrapperClasses='table-responsive'
        classes='table align-middle gs-0 gy-2'
        headerClasses='fw-bolder text-center'
        noDataIndication={() => {
          return (
            <div className='row'>
              <div className='col-lg-12' style={{ textAlign: 'center' }}>
                No Data
              </div>
            </div>
          );
        }}
      />
    </>
  );
};

export default DetailReceivable;
