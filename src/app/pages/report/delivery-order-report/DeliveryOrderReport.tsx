import React, { FC, useEffect } from 'react';
import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux';
import { ColumnDescription } from 'react-bootstrap-table-next';
import { RootState } from '../../../../setup';
import DefaultTable from '../../../modules/custom-table';
import FormDeliveryReport from './component/FormDeliveryReport';
import * as redux from './redux/DeliveryReportRedux';
import { getLocal } from '../../../../setup/encrypt.js';
import DeliveryReportPDF from './component/DeliveryOrderPDF.jsx';
import DeliveryReportExcel from './component/DeliveryOrderExcel.jsx';

const mapState = (state: RootState) => ({ auth: state.modal });
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const DeliveryOrderReportPage: FC<PropsFromRedux> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(redux.actions.getListSJ());
    dispatch(redux.actions.getListStore());
  }, [dispatch]);

  const dataTab: any = useSelector<RootState>(({ reportdelivery }) => reportdelivery.feedback);

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
      dataField: 'no_surat_jalan',
      text: 'No Delivery Order',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
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
      dataField: 'tanggal_surat_jalan',
      text: 'Delivery Order Date',
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
      dataField: 'status',
      text: 'Validation Status',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
  ];

  const handlePDFPrint = () => {
    getLocal('headDataReport', ['date']).then((res) => {
      DeliveryReportPDF(dataTab, res);
    });
  };

  return (
    <>
      <div className='card mb-5 mb-xl-8'>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>Report Delivery Order</span>
          </h3>
        </div>
        <div className='card-body py-3'>
          <div className='row'>
            <div className='col-lg-12'>
              <FormDeliveryReport
                onSubmit={(data: any) => {
                  // eslint-disable-next-line
                  dispatch(redux.actions.getReportDelivery(data));
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
              <DeliveryReportExcel data={dataTab} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connector(DeliveryOrderReportPage);
