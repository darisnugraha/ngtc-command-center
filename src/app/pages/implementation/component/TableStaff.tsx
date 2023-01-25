import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import { RootState } from '../../../../setup';
import { KTSVG } from '../../../../_metronic/helpers';
import * as redux from '../redux/ImplementationRedux';

const TableStaff: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  const dataTab: any = useSelector<RootState>(({ implementation }) => implementation.localStaff);

  const columns: ColumnDescription[] = [
    {
      dataField: 'key',
      text: 'No',
      align: 'center',
      formatter: (cell) => {
        return <p className='ps-4 text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'kode_helpdesk',
      text: 'Staff Code',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'nama_helpdesk',
      text: 'Staff Name',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
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
              dispatch(redux.actions.deleteStaffLocal(row.kode_helpdesk));
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

export default TableStaff;
