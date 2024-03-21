import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import { KTSVG } from '../../../../../_metronic/helpers';
import { RootState } from '../../../../../setup';
import * as redux from '../redux/ListOCRedux';

const TableDataDiskon: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  const dataTab: any = useSelector<RootState>(
    ({ listorderconfirmation }) => listorderconfirmation.feedbackDiskon
  );

  const columns: ColumnDescription[] = [
    {
      dataField: 'nama_diskon',
      text: 'Discount Name',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
      },
    },
    {
      dataField: 'persentase',
      text: '%',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
      },
    },
    {
      dataField: 'sub_total',
      text: 'Sub Total',
      align: 'right',
      formatter: (cell) => {
        return (
          <p className='text-hover-primary d-block mb-1 fs-6'>
            Rp. {cell?.toLocaleString() || '-'}
          </p>
        );
      },
    },
    {
      dataField: 'nominal_diskon',
      text: 'Discount',
      align: 'right',
      formatter: (cell) => {
        return (
          <p className='text-hover-primary d-block mb-1 fs-6'>
            Rp. {cell?.toLocaleString() || '-'}
          </p>
        );
      },
    },
    {
      dataField: 'harga_setelah_diskon',
      text: 'Final Price',
      align: 'right',
      formatter: (cell) => {
        return (
          <p className='text-hover-primary d-block mb-1 fs-6'>
            Rp. {cell?.toLocaleString() || '-'}
          </p>
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
          <button
            type='button'
            onClick={() => {
              dispatch(redux.actions.deleteDiscount(row.kode_diskon));
            }}
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
          >
            <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
          </button>
        );
      },
    },
  ];

  return (
    <>
      <h3 className='card-title align-items-start flex-column mb-5'>
        <span className='card-label fw-bolder fs-3 mb-1'>List Discount Global</span>
      </h3>
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

export default TableDataDiskon;
