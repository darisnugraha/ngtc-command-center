import React, { FC, useEffect } from 'react';
import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux';
import { ColumnDescription } from 'react-bootstrap-table-next';
import { RootState } from '../../../../setup';
import DefaultTable from '../../../modules/custom-table';
import FormResellerPaymentReport from './component/FormResellerPaymentReport';
import * as redux from './redux/ResellerPaymentReportRedux';
import { getLocal } from '../../../../setup/encrypt.js';
import ResellerPaymentReportPDF from './component/ResellerPaymentPDF.jsx';
import ResellerPaymentReportExcel from './component/ResellerPaymentExcel.jsx';

const mapState = (state: RootState) => ({ auth: state.modal });
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ResellerPaymentReport: FC<PropsFromRedux> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(redux.actions.getListOC());
    dispatch(redux.actions.getListStore());
  }, [dispatch]);

  const dataTab: any = useSelector<RootState>(
    ({ reportresellerpayment }) => reportresellerpayment.feedback
  );

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
      text: 'No Order Confirmation',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: '',
      text: 'Store Name',
      align: 'center',
      formatter: (cell, row) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{row.sales_order.nama_toko}</p>;
      },
    },
    {
      dataField: '',
      text: 'Branch Name',
      align: 'center',
      formatter: (cell, row) => {
        return (
          <p className='text-hover-primary d-block mb-1 fs-6'>{row.sales_order.nama_cabang}</p>
        );
      },
    },
    {
      dataField: 'nama_reseller',
      text: 'Reseller Name',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'biaya_reseller',
      text: 'Reseller Fee',
      align: 'right',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>Rp. {cell?.toLocaleString()}</p>;
      },
    },
    {
      dataField: 'status',
      text: 'Payment Status',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
  ];

  const handlePDFPrint = () => {
    getLocal('headDataReport', ['date']).then((res) => {
      ResellerPaymentReportPDF(dataTab, res);
    });
  };

  return (
    <>
      <div className='card mb-5 mb-xl-8'>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>Report Reseller Payment</span>
          </h3>
        </div>
        <div className='card-body py-3'>
          <div className='row'>
            <div className='col-lg-12'>
              <FormResellerPaymentReport
                onSubmit={(data: any) => {
                  // eslint-disable-next-line
                  dispatch(redux.actions.getReportResellerPayment(data));
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-lg-12'>
          <DefaultTable className='mb-5 mb-xl-8' data={dataTab} columns={columns} />
        </div>
        <div className='col-lg-6' />
        <div className='col-lg-6'>
          <div className={dataTab.length === 0 ? 'd-none' : 'row justify-content-end mt-5'}>
            <div className='col-lg-3 d-grid'>
              <button
                type='button'
                onClick={() => {
                  // eslint-disable-next-line
                  handlePDFPrint();
                }}
                className='btn btn-danger btn-lg me-1'
              >
                PDF
              </button>
            </div>
            <div className='col-lg-3 d-grid'>
              <ResellerPaymentReportExcel data={dataTab} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connector(ResellerPaymentReport);
