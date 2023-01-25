import React, { FC, useEffect } from 'react';
import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux';
import { ColumnDescription } from 'react-bootstrap-table-next';
import { RootState } from '../../../../setup';
import DefaultTable from '../../../modules/custom-table';
import FormReceivableReport from './component/FormReceivableReport';
import * as redux from './redux/ReceivableReportRedux';
import { getLocal } from '../../../../setup/encrypt.js';
import ReceivableReportPDF from './component/ReceivablePDF.jsx';
import ReceivableReportExcel from './component/ReceivableExcel.jsx';

const mapState = (state: RootState) => ({ auth: state.modal });
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ReceivablePage: FC<PropsFromRedux> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(redux.actions.getListOC());
    dispatch(redux.actions.getListStore());
  }, [dispatch]);

  const dataTab: any = useSelector<RootState>(({ reportreceivable }) => reportreceivable.feedback);

  const columns: ColumnDescription[] = [
    {
      dataField: 'key',
      text: 'No',
      align: 'center',
      headerClasses: 'ps-4 min-w-100px rounded-start',
      formatter: (cell) => {
        return <p className='ps-4 text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
      footerAlign: 'right',
      footer: () => {
        return '';
      },
    },
    {
      dataField: 'no_order_konfirmasi',
      text: 'No Order Confirmation',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
      footerAlign: 'right',
      footer: () => {
        return '';
      },
    },
    {
      dataField: 'kode_toko',
      text: 'Store',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
      footerAlign: 'right',
      footer: () => {
        return '';
      },
    },
    {
      dataField: 'nama_cabang',
      text: 'Branch Store',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
      footerAlign: 'right',
      footer: () => {
        return 'Grand Total';
      },
    },
    {
      dataField: 'total_harga',
      text: 'Total',
      align: 'right',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>Rp. {cell.toLocaleString()}</p>;
      },
      footerAlign: 'right',
      footer: () => {
        return `Rp. ${dataTab.reduce((a: any, b: any) => a + b.total_harga, 0).toLocaleString()}`;
      },
    },
    {
      dataField: 'sisa_tagihan',
      text: 'Rest Of The Bill',
      align: 'right',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>Rp. {cell.toLocaleString()}</p>;
      },
      footerAlign: 'right',
      footer: () => {
        return `Rp. ${dataTab.reduce((a: any, b: any) => a + b.sisa_tagihan, 0).toLocaleString()}`;
      },
    },
    {
      dataField: 'status',
      text: 'Status',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
  ];

  const handlePDFPrint = () => {
    getLocal('headDataReport', ['date']).then((res) => {
      ReceivableReportPDF(dataTab, res);
    });
  };

  return (
    <>
      <div className='card mb-5 mb-xl-8'>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>Report Receivable</span>
            {/* <span className='text-muted mt-1 fw-bold fs-7'>{subtitle}</span> */}
          </h3>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
          <FormReceivableReport
            onSubmit={(data: any) => {
              // eslint-disable-next-line
              dispatch(redux.actions.getReportReceivable(data));
            }}
          />
        </div>
        {/* begin::Body */}
      </div>
      <div className='row'>
        <div className='col-lg-12'>
          <DefaultTable className='mb-5 mb-xl-8' data={dataTab} columns={columns} />
        </div>
        <div className='col-lg-6' />
        <div className='col-lg-6'>
          <div className='row justify-content-end mt-5'>
            <div className='col-lg-3 d-grid'>
              <button
                type='button'
                onClick={() => {
                  // eslint-disable-next-line
                  handlePDFPrint();
                }}
                className='btn btn-danger btn-lg me-1'
                disabled={dataTab.length === 0}
              >
                PDF
              </button>
            </div>
            <div className='col-lg-3 d-grid'>
              <ReceivableReportExcel data={dataTab} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connector(ReceivablePage);
