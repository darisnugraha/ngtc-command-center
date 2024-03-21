import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import { KTSVG } from '../../../../../_metronic/helpers';
import { RootState } from '../../../../../setup';
import * as redux from '../redux/AddOrderConfirmationServiceRedux';
import { manipulatePriceData } from '../../../../../setup/function.js';

const TableProductionService: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  const dataTab: any = useSelector<RootState>(
    ({ addorderconfirmationservice }) => addorderconfirmationservice.listProduction
  );

  const listProduct: any = useSelector<RootState>(
    ({ addorderconfirmation }) => addorderconfirmation.listProduct
  );
  const listSupport: any = useSelector<RootState>(
    ({ addorderconfirmationservice }) => addorderconfirmationservice.listSupport
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
      dataField: 'no_production_service',
      text: 'No Production Service',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'nama_production_service',
      text: 'Production Service Name',
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
      align: 'right',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'total_harga',
      text: 'Sub Price',
      align: 'right',
      formatter: manipulatePriceData,
    },
    {
      dataField: 'total_harga_diskon',
      text: 'Discount',
      align: 'right',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>Rp. {cell?.toLocaleString()}</p>;
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
              // eslint-disable-next-line
              dispatch(redux.actions.deleteProductionLocal(row.key));
            }}
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
          >
            <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
          </button>
        );
      },
    },
  ];

  function calculateTotal() {
    const sub_total = listProduct.reduce((a: any, b: any) => a + b.sub_total, 0);
    const sub_total_diskon = listProduct.reduce((a: any, b: any) => a + b.sub_total_diskon, 0);
    const sub_total_supp = listSupport.reduce((a: any, b: any) => a + b.total_harga, 0);
    const sub_total_supp_diskon = listSupport.reduce(
      (a: any, b: any) => a + b.total_harga_diskon,
      0
    );
    const sub_total_production = dataTab.reduce((a: any, b: any) => a + b.total_harga, 0);
    const sub_total_production_diskon = dataTab.reduce(
      (a: any, b: any) => a + b.total_harga_diskon,
      0
    );
    return (
      sub_total -
      sub_total_diskon +
      (sub_total_production - sub_total_supp_diskon) +
      (sub_total_supp - sub_total_production_diskon)
    );
  }

  return (
    <>
      <h3 className='card-title align-items-start flex-column'>
        <span className='card-label fw-bolder fs-3 mb-1'>List Production Service</span>
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
      <div className='text-end'>
        <h2>Total : Rp. {calculateTotal().toLocaleString()}</h2>
      </div>
    </>
  );
};

export default TableProductionService;
