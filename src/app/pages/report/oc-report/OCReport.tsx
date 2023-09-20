import React, { FC, useEffect } from 'react';
import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux';
import { ColumnDescription } from 'react-bootstrap-table-next';
import { RootState } from '../../../../setup';
import DefaultTable from '../../../modules/custom-table';
import FormOCReport from './component/FormOCReport';
import * as redux from './redux/OCReportRedux';
import { getLocal } from '../../../../setup/encrypt.js';
import OCRecapReportPDF from './component/OCRecapPDF.jsx';
import OCRecapReportExcel from './component/OCRecapExcel.jsx';
import OCDetailPDF from './component/OCDetailPDF.jsx';
import OCDetailReportExcel from './component/OCDetailExcel.jsx';

const mapState = (state: RootState) => ({
  auth: state.modal,
});
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const OCPage: FC<PropsFromRedux> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(redux.actions.getListOC());
    dispatch(redux.actions.getListStore());
  }, [dispatch]);

  const dataTab: any = useSelector<RootState>(({ reportoc }) => reportoc.feedback);

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
      dataField: 'jenis_ok',
      text: 'Type OC',
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
      dataField: 'nama_toko',
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
        return '';
      },
    },
    {
      dataField: 'nama_customer',
      text: 'Customer Name',
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
        return <p className='text-hover-primary d-block mb-1 fs-6'>Rp. {cell?.toLocaleString()}</p>;
      },
      footerAlign: 'right',
      footer: () => {
        return `Rp. ${dataTab.reduce((a: any, b: any) => a + b.total_harga, 0).toLocaleString()}`;
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

  const typeReport = useSelector<RootState>(({ reportoc }) => reportoc.typeReport);

  const handlePDFPrint = () => {
    getLocal('headDataReport', ['date']).then((res) => {
      if (typeReport === 'DETAIL') {
        OCDetailPDF(dataTab, res);
      } else {
        OCRecapReportPDF(dataTab, res);
      }
    });
  };

  return (
    <>
      <div className='card mb-5 mb-xl-8'>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>Report Order Confirmation</span>
            {/* <span className='text-muted mt-1 fw-bold fs-7'>{subtitle}</span> */}
          </h3>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
          <FormOCReport
            onSubmit={(data: any) => {
              // eslint-disable-next-line
              dispatch(redux.actions.getReportOC(data));
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
              {typeReport === 'DETAIL' ? (
                <OCDetailReportExcel data={dataTab} />
              ) : (
                <OCRecapReportExcel data={dataTab} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connector(OCPage);
