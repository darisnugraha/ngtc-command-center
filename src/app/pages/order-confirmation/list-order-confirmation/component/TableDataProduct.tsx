import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import { KTSVG } from '../../../../../_metronic/helpers';
import { RootState } from '../../../../../setup';
import * as redux from '../redux/ListOCRedux';

const TableDataProduct: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  const dataTab: any = useSelector<RootState>(
    ({ listorderconfirmation }) => listorderconfirmation.feedbackProduct
  );

  const columns: ColumnDescription[] = [
    {
      dataField: 'nama_produk',
      text: 'Product Name',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
      },
    },
    {
      dataField: 'qty',
      text: 'Qty',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
      },
    },
    {
      dataField: 'satuan',
      text: 'Unit',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
      },
    },
    {
      dataField: 'harga',
      text: 'Price',
      align: 'center',
      formatter: (cell) => {
        return (
          <p className='text-hover-primary d-block mb-1 fs-6'>Rp. {cell.toLocaleString() || '-'}</p>
        );
      },
    },
    {
      dataField: 'sub_total',
      text: 'Sub Total',
      align: 'right',
      formatter: (cell) => {
        return (
          <p className='text-hover-primary d-block mb-1 fs-6'>Rp. {cell.toLocaleString() || '-'}</p>
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
              dispatch(redux.actions.deleteProduct(row.kode_produk));
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
  );
};

export default TableDataProduct;
