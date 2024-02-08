import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import { KTSVG } from '../../../../../_metronic/helpers';
import { RootState } from '../../../../../setup';
import * as redux from '../redux/AddOrderConfirmationRedux';

const TableListProduct: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  const dataTab: any = useSelector<RootState>(
    ({ addorderconfirmation }) => addorderconfirmation.listProduct
  );

  const isPackage = useSelector<RootState>(
    ({ addorderconfirmation }) => addorderconfirmation.isPackage
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
      footer: '',
    },
    {
      dataField: 'nama_produk',
      text: 'Product Name',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'tipe_produk',
      text: 'Product Type',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'qty',
      text: 'Qty',
      align: 'right',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'satuan',
      text: 'Unit',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'harga',
      text: 'Price',
      align: 'right',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>Rp. {cell.toLocaleString()}</p>;
      },
    },
    {
      dataField: 'sub_total',
      text: 'Sub Total',
      align: 'right',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>Rp. {cell.toLocaleString()}</p>;
      },
    },
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
                dispatch(redux.actions.editProduct(row.key));
              }}
              className={
                isPackage !== 'true'
                  ? 'd-none'
                  : 'btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
              }
            >
              <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
            </button>
            <button
              type='button'
              onClick={() => {
                dispatch(redux.actions.deleteProduct(row.key));
              }}
              // className={
              //   isPackage === 'true'
              //     ? 'd-none'
              //     : 'btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
              // }
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
            >
              <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
            </button>
          </>
        );
      },
    },
  ];

  return (
    <>
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
      <div className='text-end'>
        <h3>
          Total : Rp. {dataTab.reduce((a: any, b: any) => a + b.sub_total, 0).toLocaleString()}
        </h3>
      </div>
    </>
  );
};

export default TableListProduct;
